"use client"

import PaymentCard from "@/components/custom/payment-card"
import { useState } from "react"

export default function Home() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    console.log("Payment submitted")
    setSubmitted(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {!submitted ? (
        <PaymentCard handleSubmit={handleSubmit} />
      ) : (
        <div className="text-2xl bg-green-100 p-4 rounded-lg">Payment Submitted Successfully!</div>
      )}
    </main>
  )
}

