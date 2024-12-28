import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51PtJLUEP1jVEybu3hagsAPq7HS6p948Lca3WXaCi6AG7Loqn1MF8t2rvAgK58x5WZOrHrSHyuvPJt9OXtKxLE0ia00rwj8X4fp"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}