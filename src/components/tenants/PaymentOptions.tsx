"use client";

import { useState } from "react";

type PaymentOptionsProps = {
  listingId: string;
  amount: number;
};

export default function PaymentOptions({
  listingId,
  amount,
}: PaymentOptionsProps) {
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setProcessing(true);
    setMessage("");

    try {
      // Payment integration placeholder.
      // Connect this to the RentHub payment API when the backend
      // endpoint is ready.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage(
        `Payment request prepared for listing ${listingId}.`
      );
    } catch {
      setMessage("Unable to process the payment request.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Choose Payment Method
      </h2>

      <div className="mb-6 rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">Escrow Deposit</p>
        <p className="text-2xl font-bold text-gray-900">
          KES {amount.toLocaleString()}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setPaymentMethod("mpesa")}
          className={`rounded-xl border p-4 text-left transition ${
            paymentMethod === "mpesa"
              ? "border-green-600 bg-green-50"
              : "border-gray-200 hover:border-gray-400"
          }`}
        >
          <p className="font-bold text-gray-900">M-Pesa</p>
          <p className="mt-1 text-sm text-gray-500">
            Pay securely using M-Pesa.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`rounded-xl border p-4 text-left transition ${
            paymentMethod === "card"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 hover:border-gray-400"
          }`}
        >
          <p className="font-bold text-gray-900">Card</p>
          <p className="mt-1 text-sm text-gray-500">
            Pay using a debit or credit card.
          </p>
        </button>
      </div>

      {paymentMethod === "mpesa" && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-900">
            M-Pesa payment
          </p>
          <p className="mt-1 text-sm text-green-800">
            You will receive an M-Pesa payment prompt when the payment
            integration is connected.
          </p>
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="font-semibold text-blue-900">
            Card payment
          </p>
          <p className="mt-1 text-sm text-blue-800">
            Card processing will be handled by the configured payment
            provider.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={processing}
        className="mt-6 w-full rounded-xl bg-black px-5 py-3 font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {processing
          ? "Preparing Payment..."
          : `Continue with ${
              paymentMethod === "mpesa" ? "M-Pesa" : "Card"
            }`}
      </button>

      {message && (
        <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
          {message}
        </p>
      )}
    </section>
  );
}