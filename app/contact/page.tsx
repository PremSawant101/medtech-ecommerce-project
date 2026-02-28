"use client";

import Image from "next/image";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export default function InquirySection() {
  return (
    <section
      className={`relative   bg-linear-to-l  from-[#FFFEFE26] to-[#DFE2D2] min-h-screen flex items-center justify-center ${lexend.className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/amla-bg.jpg"
          alt="Amla Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>

      <div className="max-w-[1300px] w-full flex gap-20 px-20 items-center">

        {/* LEFT CONTENT */}
        <div className="w-1/2 text-[#4E482E]">
          <h2 className="text-5xl font-bold mb-6">
            Let’s Start Your
            <br />
            Wellness Journey
          </h2>

          <h4 className="text-xl font-semibold mb-6 text-[#6D6A5F]">
            Rooted in Ayurveda. Backed by Nature.
          </h4>

          <p className="text-lg leading-relaxed text-[#6D6A5F]">
            Have questions about our products? Want personalized
            recommendations? Reach out to us and our team will
            guide you toward healthier hair and holistic wellness.
            We’re here to help you grow naturally.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="w-1/2 bg-[#F5F3EE] rounded-[30px] shadow-xl p-12 border border-gray-300">
          <h3 className="text-2xl font-semibold mb-8 text-center text-[#4E482E]">
            Send an Inquiry
          </h3>

          <form className="flex flex-col gap-6 text-black">
            <input
              type="text"
              placeholder="Full Name"
              className="px-5 py-4 rounded-lg border border-gray-400 outline-none focus:border-[#A6B11E] transition bg-white"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="px-5 py-4 rounded-lg border border-gray-400 outline-none focus:border-[#A6B11E] transition bg-white"
            />

            <textarea
              placeholder="Describe your concern or inquiry..."
              rows={5}
              className="px-5 py-4 rounded-lg border border-gray-400 outline-none focus:border-[#A6B11E] transition bg-white resize-none"
            />

            <button
              type="submit"
              className="bg-[#4E482E] text-white py-4 rounded-full text-lg font-medium hover:scale-102 transition cursor-pointer"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}