const Home = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log("Handle Buy now click")
  }

  return (
    <>
      <div className="product-container">
        <h2>Wireless Headphones</h2>
        <img
          src="wireless-headphone.webp" // Place this file in {YOUR_PROJECT}/public/ folder
          alt="Light house"
          className="product-image"
        />
        <p>
          High-quality wireless headphones with noise cancellation and 20-hour
          battery life.
        </p>
        <div className="product-price-cta">
          <p style={{ fontSize: "24px" }}>$99.99</p>

          <button onClick={handleSubmit}>Buy Now</button>
        </div>
      </div>
    </>
  )
}

export { Home }
