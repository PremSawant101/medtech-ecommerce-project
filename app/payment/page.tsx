"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Lexend } from "next/font/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



const lexend = Lexend({ subsets: ["latin"] });

type Step =
  | "shipping"
  | "summary"
  | "success"
  | "failed";

export default function PaymentPage() {

  const [step, setStep] = useState<Step>("shipping");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { cart, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const isShippingValid =
    shippingData.fullName.trim() !== "" &&
    shippingData.address.trim() !== "" &&
    shippingData.city.trim() !== "" &&
    shippingData.country.trim() !== "" &&
    /^[0-9]{6}$/.test(shippingData.postalCode);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);
  const completePurchase = () => {
    if (!isShippingValid) {
      alert("Please fill all shipping details correctly");
      return;
    }
    setStep("summary");
  };

  const applyCoupon = async () => {
    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: coupon,
        subtotal: subtotal,
      }),
    });

    const data = await res.json();

    if (data.valid) {
      setDiscount(data.discount);
      setCouponMessage(data.message);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponMessage(data.message);
    }
  };
  const handlePayment = async () => {

    if (paymentMethod === "") return;

    const success = Math.random() > 0.4;

    if (success) {

      const orderProducts = cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      clearCart();
      setStep("success");

    } else {
      setStep("failed");
    }
  };
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.18;
  const shipping = subtotal > 500 ? 0 : 50;

  const total = subtotal + tax + shipping;
  const finalTotal = total - discount;
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const options = { day: "numeric", month: "short" };

  const deliveryRange =
    minDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }) +
    " - " +
    maxDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return (
    <main
      className={`relative min-h-screen flex items-center justify-center ${lexend.className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/amlaBg.png"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      </div>


      {/* ================= SHIPPING ================= */}
      {step === "shipping" && (

        <Card>
          <div className="mb-6 bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm font-semibold text-[#4E482E]">
                {session?.user?.email}
              </p>
            </div>

            <div className="bg-[#4E482E] text-white text-xs px-3 py-1 rounded-full">
              Verified
            </div>

          </div>

          <h2 className="text-2xl text-black font-semibold text-center mb-6">
            Shipping Information
          </h2>

          <input
            placeholder="Full Name"
            value={shippingData.fullName}
            onChange={(e) =>
              setShippingData({ ...shippingData, fullName: e.target.value })
            }
            className="w-full mb-4 px-4 py-3 text-black rounded-md border border-gray-400 outline-none bg-white"
          />

          <input
            placeholder="Address"
            value={shippingData.address}
            onChange={(e) =>
              setShippingData({ ...shippingData, address: e.target.value })
            }
            className="w-full mb-4 px-4 py-3 text-black rounded-md border border-gray-400 outline-none bg-white"
          />

          <input
            placeholder="City"
            value={shippingData.city}
            onChange={(e) =>
              setShippingData({ ...shippingData, city: e.target.value })
            }
            className="w-full mb-4 px-4 py-3 text-black rounded-md border border-gray-400 outline-none bg-white"
          />

          <input
            placeholder="Country"
            value={shippingData.country}
            onChange={(e) =>
              setShippingData({ ...shippingData, country: e.target.value })
            }
            className="w-full mb-4 px-4 py-3 text-black rounded-md border border-gray-400 outline-none bg-white"
          />

          <input
            placeholder="Postal Code"
            value={shippingData.postalCode}
            onChange={(e) =>
              setShippingData({ ...shippingData, postalCode: e.target.value })
            }
            className="w-full mb-4 px-4 py-3 text-black rounded-md border border-gray-400 outline-none bg-white"
          />
          <button
            disabled={!isShippingValid}
            onClick={completePurchase}
            className={`w-full py-4 rounded-md mt-6 transition ${isShippingValid
              ? "bg-black text-white hover:opacity-90"
              : "bg-gray-400 text-white cursor-not-allowed"
              }`}
          >
            Complete Purchase
          </button>

          <div className="text-center mt-6 text-black">
            <h3 className="text-lg  font-medium">
              Estimated Delivery
            </h3>
            <p>
              Delivery between {deliveryRange}
            </p>
          </div>
        </Card>
      )}

      {/* ================= SUMMARY ================= */}
      {step === "summary" && (
        <Card>
          <h2 className="text-xl text-black font-semibold text-center mb-4">
            Apply Discount Code
          </h2>

          <div className="flex gap-2 mb-6">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter Discount code"
              className="w-full px-4 py-3 rounded-md border text-black border-gray-400 outline-none bg-white"
            />

            <button
              onClick={applyCoupon}
              className="bg-black text-white px-4 rounded-md"
            >
              Apply
            </button>
          </div>
          {couponMessage && (
            <p className={`text-sm mt-2 ${couponMessage.includes("Applied")
              ? "text-green-600"
              : "text-red-500"
              }`}>
              {couponMessage}
            </p>
          )}
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 mb-4">

            <div className="flex justify-between">
              <span>Sub total</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes (18%)</span>
              <span>₹ {tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ {shipping}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹ {discount.toFixed(2)}</span>
              </div>
            )}

            <hr />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹ {finalTotal.toFixed(2)}</span>
            </div>

          </div>

          <h3 className="text-lg font-semibold mb-2">
            Payment Option
          </h3>

          {[
            "Credit Card",
            "UPI",
            "Debit Card",
            "Cash On Delivery",
          ].map((method) => (
            <label key={method} className="block mb-2">
              <input
                type="radio"
                name="payment"
                value={method}
                onChange={() => setPaymentMethod(method)}
                className="mr-2"
              />
              {method}
            </label>
          ))}

          <button
            onClick={handlePayment}
            className="w-full bg-black text-white py-3 mt-6 rounded-md hover:opacity-90 transition"
          >
            Pay Now
          </button>
        </Card>
      )}

      {/* ================= SUCCESS ================= */}
      {step === "success" && (
        <Card>
          <h2 className="text-2xl font-semibold text-center mb-2">
            Shipping Information
          </h2>

          <p className="text-center font-medium mb-6">
            Your order is confirmed
          </p>

          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 border-4 border-green-500 rounded-full flex items-center justify-center">
              <span className="text-green-500 text-5xl">✔</span>
            </div>
          </div>

          <h3 className="text-green-600 text-2xl font-semibold text-center mb-2">
            Payment Successful
          </h3>

          <p className="text-center mb-6">
            Estimated Delivery between {deliveryRange}
          </p>

          <button
            onClick={() => router.push("/collections")}
            className="w-full bg-black text-white py-4 rounded-md"
          >
            Shop More
          </button>
        </Card>
      )}

      {/* ================= FAILED ================= */}
      {step === "failed" && (
        <Card>
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 border-4 border-red-500 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-5xl">✕</span>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-center mb-2">
            Payment Failed
          </h3>

          <p className="text-center mb-6">
            Try again, payment failed
          </p>

          <button
            onClick={() => setStep("summary")}
            className="underline text-center w-full"
          >
            Go back to cart
          </button>
        </Card>
      )}
    </main>
  );
}

/* ================= REUSABLE CARD ================= */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[450px] bg-[#F5F3EE] text-black rounded-xl shadow-xl p-8 border border-gray-400">
      {children}
      <div className="text-right text-sm mt-8">
        © 2026 Ayurveda Shop
      </div>
    </div>
  );
}