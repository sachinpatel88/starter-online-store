import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const OrderStatusPage = () => {
  const [message, setMessage] = useState(null)
  const params = useParams()

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/payment-status/${params?.intentId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then(({ paymentIntent }) => {
        if (!paymentIntent.status) {
          setMessage("Something went wrong.")
          return
        }
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.")
            break

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            )
            break

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage("Payment failed. Please try another payment method.")
            break

          default:
            setMessage("Something went wrong.")
            break
        }
      })
  }, [])

  return <section className="card-container">{message}</section>
}

export { OrderStatusPage }
