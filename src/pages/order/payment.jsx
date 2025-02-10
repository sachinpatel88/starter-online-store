import { Elements } from "@stripe/react-stripe-js"

import getStripe from "../../../lib/utils/stripe"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PaymentForm } from "../../components/stripe-payment/paymentForm"

const stripePromise = getStripe()

const PaymentPage = () => {
  const params = useParams()

  const [clientSecret, setClientSecret] = useState()

  const appearance = {
    theme: "flat",
    labels: "floating",
    rules: {
      ".Tab--selected": {
        backgroundColor: "#372B3B",
      },
    },
  }

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    appearance,
  }

  useEffect(() => {
    if (clientSecret) return

    // Get the client_secret as soon as the page loads
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/get-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intentId: params.intentId }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  return (
    <section className="card-container stripe-widget">
      {!clientSecret ? "Loading" : ""}
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm intentId={params.intentId} />
        </Elements>
      )}
    </section>
  )
}

export { PaymentPage }
