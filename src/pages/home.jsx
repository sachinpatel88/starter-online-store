import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/products`
        )
        const data = await response.json()
        console.log(data)
        setProduct(data.products?.[0]) // Assuming one product for simplicity
      } catch (error) {
        console.error("Error fetching product data:", error)
      }
    }

    fetchProduct()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // Create a payment intent on the server
      const data = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item: { id: product.id } }),
        }
      ).then((res) => res.json())

      console.log(data)
      if (data?.intentId) {
        navigate(`/order/payment/${data?.intentId}`)
        return
      }

      if (error) {
        console.error("Payment failed:", error)
        alert("Payment failed. Please try again.")
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent)
        alert("Payment successful! Thank you for your purchase.")
      }
    } catch (error) {
      console.error("Error during payment:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="card-container">
      {product ? (
        <>
          <h2>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <p>{product.description}</p>
          <div className="product-price-cta">
            <p style={{ fontSize: "24px" }}>${product.amount}</p>
            <button onClick={handleSubmit}>Buy Now</button>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  )
}

export { Home }
