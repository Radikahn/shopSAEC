import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { CartItem } from '#/components/MainPage/ItemFeature'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const affiliations = ['SJSU Student', 'SJSU Alumni', 'Friend of SAEC'] as const

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const [cartItem, setCartItem] = useState<CartItem | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [venmoUsername, setVenmoUsername] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [policyExpanded, setPolicyExpanded] = useState(false)

  const formComplete =
    email.trim() !== '' && phone.trim() !== '' && venmoUsername.trim() !== '' && affiliation !== ''

  useEffect(() => {
    const stored = localStorage.getItem('saec_cart')
    if (stored) {
      setCartItem(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  function clearCart() {
    localStorage.removeItem('saec_cart')
    setCartItem(null)
  }

  function openVenmo() {
    if (!cartItem) return
    const total = cartItem.price * cartItem.quantity
    const note = `SAEC ${cartItem.item} - Size ${cartItem.size} x${cartItem.quantity}`
    const venmoUrl = `https://venmo.com/sjsu_saec?txn=pay&amount=${total}&note=${encodeURIComponent(note)}`
    window.open(venmoUrl, '_blank')
  }

  async function handleCheckout() {
    if (!cartItem || !formComplete) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          venmo_username: venmoUsername,
          affiliation,
          cart_item: cartItem,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          data.detail || `Failed to save order (${res.status})`,
        )
      }

      openVenmo()
      setSubmitted(true)
      localStorage.removeItem('saec_cart')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="mt-2 mx-2 sm:mx-4 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl pb-8 rounded-md border-2 border-blue-100/30 bg-blue-950-950/20 p-8">
          <span className="opacity-60">Loading...</span>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mt-2 mx-2 sm:mx-4 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl pb-8 rounded-md border-2 border-blue-100/30 bg-blue-950-950/20 p-8">
          <div className="p-4 border-b border-neutral-200/20">
            <span className="text-lg">Order Placed</span>
          </div>
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="text-base">Thank you for your order!</span>
            <span className="text-sm opacity-60 text-center">
              A confirmation email has been sent to {email}.
              <br />
              Complete your payment via Venmo to @sjsu_saec.
            </span>
            <button
              onClick={() => navigate({ to: '/' })}
              className="mt-4 px-8 py-2 bg-neutral-200/20 border border-neutral-50/20 hover:bg-neutral-100/30 rounded-4xl transition-all duration-300 cursor-pointer"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!cartItem) {
    return (
      <div className="mt-2 mx-2 sm:mx-4 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl pb-8 rounded-md border-2 border-blue-100/30 bg-blue-950-950/20 p-8">
          <div className="p-4 border-b border-neutral-200/20">
            <span className="text-lg">Checkout</span>
          </div>
          <div className="flex flex-col items-center justify-center py-16">
            <span className="opacity-60 mb-6">Your cart is empty</span>
            <button
              onClick={() => navigate({ to: '/' })}
              className="px-8 py-2 bg-neutral-200/20 border border-neutral-50/20 hover:bg-neutral-100/30 rounded-4xl transition-all duration-300 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  const total = cartItem.price * cartItem.quantity

  return (
    <div className="mt-2 mx-2 sm:mx-4 -mb-10 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl pb-8 rounded-md border-2 border-blue-100/30 bg-blue-950-950/20">
        <div className="p-4 border-b border-neutral-200/20">
          <span className="text-lg">Checkout</span>
        </div>

        <div className="mx-4 sm:mx-8 mt-6">
          {/* Order Summary */}
          <div className="border-2 border-blue-100/20 rounded-md p-4 sm:p-6">
            <span className="text-sm opacity-70 uppercase tracking-wide">
              Order Summary
            </span>

            <div className="mt-4 flex flex-row items-start gap-4 sm:gap-6">
              <img
                src="/CLEAN.png"
                alt={cartItem.item}
                className="w-24 sm:w-32 rounded-md border border-blue-100/20"
              />
              <div className="flex flex-col flex-1">
                <span className="text-base">{cartItem.item}</span>
                <div className="mt-3 flex flex-col gap-1 text-sm opacity-80">
                  <span>
                    Size:{' '}
                    <span className="ml-2 px-2 py-0.5 bg-neutral-200/15 border border-neutral-200/10 rounded-2xl text-xs">
                      {cartItem.size}
                    </span>
                  </span>
                  <span className="mt-1">Qty: {cartItem.quantity}</span>
                  <span className="mt-1">
                    ${cartItem.price}.00{' '}
                    {cartItem.quantity > 1 ? 'each' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-6 pt-4 border-t border-neutral-200/20">
              <div className="flex justify-between text-sm opacity-70">
                <span>Subtotal</span>
                <span>${total}.00</span>
              </div>
              <div className="flex justify-between text-sm opacity-70 mt-1">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-neutral-200/20 text-base">
                <span>Total</span>
                <span>${total}.00</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mt-6 border-2 border-blue-100/20 rounded-md p-4 sm:p-6">
            <span className="text-sm opacity-70 uppercase tracking-wide">
              Your Info
            </span>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-70">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="px-3 py-2 bg-neutral-200/10 border border-neutral-200/20 rounded-md text-sm focus:outline-none focus:border-blue-400/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-70">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(408) 555-1234"
                  className="px-3 py-2 bg-neutral-200/10 border border-neutral-200/20 rounded-md text-sm focus:outline-none focus:border-blue-400/50"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-70">Venmo Username</label>
                <input
                  type="text"
                  value={venmoUsername}
                  onChange={(e) => setVenmoUsername(e.target.value)}
                  placeholder="@your-venmo"
                  className="px-3 py-2 bg-neutral-200/10 border border-neutral-200/20 rounded-md text-sm focus:outline-none focus:border-blue-400/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm opacity-70">
                  How are you connected to SAEC?
                </label>
                {affiliations.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="affiliation"
                      value={option}
                      checked={affiliation === option}
                      onChange={(e) => setAffiliation(e.target.value)}
                      className="accent-blue-400"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              onClick={handleCheckout}
              disabled={!formComplete || submitting}
              className={`w-full px-8 py-3 rounded-4xl transition-all duration-300 text-center ${
                !formComplete || submitting
                  ? 'bg-neutral-200/10 border border-neutral-50/10 opacity-50 cursor-not-allowed'
                  : 'bg-[#008CFF]/20 border border-[#008CFF]/30 hover:bg-[#008CFF]/30 cursor-pointer'
              }`}
            >
              {submitting ? 'Saving order...' : `Pay with Venmo - $${total}.00`}
            </button>
            {!formComplete && (
              <span className="text-xs opacity-50">
                Fill in all fields above to continue
              </span>
            )}
            {formComplete && !submitting && (
              <span className="text-xs opacity-50">
                You will be redirected to Venmo to complete payment to @sjsu_saec
              </span>
            )}
            {error && <span className="text-sm text-red-400">{error}</span>}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-row justify-between items-center">
            <button
              onClick={() => navigate({ to: '/' })}
              className="text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              &larr; Back to Shop
            </button>
            <button
              onClick={clearCart}
              className="text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              Clear Cart
            </button>
          </div>

          {/* Fine Print */}
          <div className="mt-8 pt-4 border-t border-neutral-200/10">
            <div className="text-[11px] leading-relaxed opacity-40">
              <p>
                All orders are considered pending until payment has been
                verified. Payments are processed through Venmo and will be
                manually confirmed by SAEC staff.
              </p>
              {!policyExpanded && (
                <button
                  onClick={() => setPolicyExpanded(true)}
                  className="mt-1 opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  ...
                </button>
              )}
              {policyExpanded && (
                <div className="mt-2 flex flex-col gap-2">
                  <p>
                    Orders without a matching verified payment will not be
                    fulfilled. If payment cannot be verified, a follow-up email
                    will be sent to the address provided at checkout. If no
                    response or payment confirmation is received within 7 days,
                    the order will be automatically canceled and inventory
                    released.
                  </p>
                  <p>
                    Orders will only be confirmed after payment verification. A
                    separate confirmation email will be sent once your order is
                    approved and ready for pickup coordination.
                  </p>
                  <p>
                    This is a preorder item. Estimated pickup is mid-April.
                    Pickup will be available at official SAEC meets, campus
                    tabling events, or by scheduled arrangement with SAEC
                    leadership.
                  </p>
                  <p>
                    SAEC does not offer shipping at this time. Orders must be
                    picked up in person.
                  </p>
                  <p>
                    For questions, payment issues, or scheduling, please
                    contact:{' '}
                    <a
                      href="mailto:saec.sjsu@gmail.com"
                      className="underline hover:opacity-100"
                    >
                      saec.sjsu@gmail.com
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
