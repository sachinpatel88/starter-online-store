import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

const PaymentForm = ({ intentId }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_BASE_URL}/order/status/${intentId}`,
      },
    })

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <>
      <h1>Payment details</h1>
      <form onSubmit={handleSubmit}>
        <PaymentElement />

        <button
          disabled={!stripe}
          style={{
            marginTop: "18px",
          }}
        >
          Submit
        </button>
      </form>
    </>
  )
}

export { PaymentForm }
