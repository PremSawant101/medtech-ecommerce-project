"use client";

import Image from "next/image";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export default function InquirySection() {
  return (
    <>
      <section
        className={`relative bg-linear-to-l from-[#FFFEFE26] to-[#DFE2D2] min-h-screen flex items-center justify-center pt-32 lg:pt-0 pb-10 lg:pb-0 ${lexend.className}`}
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

        <div className="max-w-[1300px] w-full flex flex-col lg:flex-row gap-10 lg:gap-20 px-6 lg:px-20 items-center">

          {/* LEFT CONTENT */}

          <div className="w-full lg:w-1/2 text-[#4E482E]">

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let’s Start Your
              <br />
              Wellness Journey
            </h2>

            <h4 className="text-xl font-semibold mb-6 text-[#6D6A5F]">
              Rooted in Ayurveda. Backed by Nature.
            </h4>

            <p className="text-lg leading-relaxed text-[#6D6A5F]">
              Have questions about our products? Want personalized
              recommendations? Reach out to us and our team will guide
              you toward healthier hair and holistic wellness.
              We’re here to help you grow naturally.
            </p>

            <div className="mt-10 space-y-4 text-[#4E482E]">

              <div>
                <p className="font-semibold text-lg">Phone</p>
                <p className="text-[#6D6A5F]">079 4800 4200</p>
              </div>

              <div>
                <p className="font-semibold text-lg">Email</p>
                <p className="text-[#6D6A5F]">
                  mihirayurved79@gmail.com
                </p>
              </div>

              <div>
                <p className="font-semibold text-lg">Address</p>
                <p className="text-[#6D6A5F]">
                  FF1, Palak 2, Above SBI, Anand Nagar – Ramdevnagar
                  Road, Satellite, Ahmedabad – 15
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT FORM */}

          <div className="w-full lg:w-1/2 bg-[#F5F3EE] rounded-[30px] shadow-xl p-6 lg:p-12 border border-gray-300">

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
                className="bg-[#4E482E] text-white py-4 rounded-full text-lg font-medium hover:scale-105 transition cursor-pointer"
              >
                Submit Inquiry
              </button>

            </form>

          </div>

        </div>

      </section>


      <section className="bg-[#F4F3EE] py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4E482E] mb-12">
            Visit Our Clinic
          </h2>

          <div className="w-full h-[420px] rounded-[30px] overflow-hidden shadow-xl border">

            <iframe
              src="https://maps.google.com/maps?q=Anand%20Nagar%20Satellite%20Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>

    </>
  );
}