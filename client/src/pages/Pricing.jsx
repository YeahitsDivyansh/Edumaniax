import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Hero from "@/PricingDesign/Hero";

const plans = [
  {
    title: "STARTER PLAN",
    price: "₹0",
    frequency: "Per member, per Month",
    description: "Perfect to explore and get started.",
    features: [
      "Access to 1 free game/module",
      "Notes for the selected module",
      "Access to basic learning tools",
      { text: "No access to premium modules", excluded: true },
      { text: "No AI powered personalized assessment", excluded: true },
      { text: "No completion certificates", excluded: true },
    ],
    button: "Start Now",
  },
  {
    title: "SOLO PLAN",
    price: "₹199",
    frequency: "Per member, per 3 Month",
    description: "Ideal for focused learning on a specific topic.",
    features: [
      "Access to 1 premium module of choice",
      "Notes for the selected module",
      "Interactive activities and assessments",
      { text: "No access to all premium modules", excluded: true },
      { text: "No AI powered personalized assessment", excluded: true },
      { text: "No completion certificates", excluded: true },
    ],
    button: "Start Now",
  },
  {
    title: "PRO PLAN",
    price: "₹1433",
    frequency: "Per member, per 3 Month",
    description: "Full learning experience for committed users",
    features: [
      "Access to all premium modules",
      "Notes for every module",
      "All interactive games and assessments",
      "AI powered personalized assessment",
      "Completion certificates",
    ],
    button: "Start Now",
    tag: "Popular",
    discount: "Save 20%",
  },
  {
    title: "INSTITUTIONAL PLAN",
    price: "Custom",
    frequency: "Per member, per Month",
    description: "Tailored for bulk use with flexibility.",
    features: [
      "Access for 30+ users",
      "All modules notes & games included",
      "Custom onboarding & priority support",
      "Live Lectures by SME",
      "AI powered personalized assessment",
      "Completion certificates",
    ],
    button: "Contact Us",
  },
];

const faqData = [
  {
    question: "What if I’m not satisfied with EduManiax after joining?",
    answer:
      "No worries! EduManiax offers a 90% refund policy for your peace of mind. Before enrolling, you also get a full demo of the platform, personalized one-on-one interaction, and access to our 24/7 support team to help you at every step.",
    QbgColor: "bg-[#6DEE0E]", // Vivid green
    AbgColor: "bg-[#E9FCD4]", // 🍏 Light green pastel
  },
  {
    question: "How is EduManiax different from other platforms?",
    answer:
      "With our unique combination of risk‑free demo and refund policy, personalized onboarding, and round‑the‑clock support, EduManiax is built to ensure every learner feels confident and supported.",
    QbgColor: "bg-[#FEC6C7]", // Soft pink
    AbgColor: "bg-[#FFF1F2]", // 🌸 Ultra-light pink
  },
  {
    question: "What payment methods are accepted on EduManiax?",
    answer:
      "We use Razorpay as our secure payment gateway, which supports all major payment methods including credit/debit cards, UPI, net banking, PayPal, and wallets. Fast, safe, and hassle-free!",
    QbgColor: "bg-[#DBEDFB]", // Light blue
    AbgColor: "bg-[#F0F9FF]", // ❄️ Icy sky blue
  },
  {
    question: "Can I speak to someone if I have doubts?",
    answer:
      "Absolutely! If you have any doubts or need help, our dedicated customer support team is just a call away. We're here to guide you throughout your learning journey.",
    QbgColor: "bg-[#DABFFF]", // Lavender
    AbgColor: "bg-[#F5EBFF]", // 🪻 Soft lavender haze
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! EduManiax currently offers a one-day free trial that grants access to all premium features.",
    QbgColor: "bg-[#FFE7A1]", // Soft yellow
    AbgColor: "bg-[#FFFBE5]", // ☀️ Pale yellow pastel
  },
];

const Pricing = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative z-0">
        <Hero />
      </div>

      {/* Pricing Cards */}
      <section className="relative z-10 bg-transparent -mt-40 px-4 pt-16 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 inter-font">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative border-[#D9D9D9] border-2 filter hover:border-[#068F36]`} style={{ filter: "drop-shadow(1px -1px 5px rgba(0, 0, 0, 0.25))" }}
            >
              {/* Tags */}
              <div className="relative mb-4">
                {plan.title === "PRO PLAN" && (
                  <img
                    src="/pricingDesign/save20.svg"
                    alt="Save 20%"
                    className="absolute -mt-9 -mr-6 -top-0 right-0 w-[113px] h-[49px] z-10"
                  />
                )}
                {plan.tag && (
                  <span className="bg-[#EFB100] text-black text-xs font-medium px-2 py-1 rounded w-fit shadow">
                    {plan.tag}
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div className="flex justify-start -mx-[1px]">
                <h3
                  className="text-xs font-extrabold uppercase text-[#007127] px-3 py-1 rounded"
                  style={{ backgroundColor: "rgba(165, 237, 110, 0.31)" }}
                >
                  {plan.title}
                </h3>
              </div>
              <p className="text-[12.5px] text-black font-light mt-2">{plan.description}</p>
              <hr className="my-3 border-gray-300" />
              <p className="text-4xl font-extrabold text-[#042038] mt-1">
                {plan.price}
              </p>
              <p className="text-xs text-black font-semibold mt-1">
                {plan.frequency}
              </p>
              <hr className="my-3 border-gray-300 mt-5" />

              {/* Features */}
              <ul className="text-xs space-y-2 flex-1 mt-2">
                {plan.features.map((feat, i) => {
                  const text = typeof feat === "string" ? feat : feat.text;
                  const excluded =
                    typeof feat === "object" && feat.excluded === true;

                  return (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 flex-shrink-0 mt-1">
                        <img
                          src={
                            excluded
                              ? "/pricingDesign/cross.svg"
                              : "/pricingDesign/tick.svg"
                          }
                          alt={excluded ? "Not included" : "Included"}
                          className={`w-full h-full object-contain ${
                            excluded ? "" : "p-[1px]"
                          }`}
                        />
                      </span>
                      <span className={"text-black font-normal text-xs"}>
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <Link
                to="/payment-required"
                className="bg-[#068F36] text-white font-semibold py-2 px-4 rounded-md hover:brightness-110 transition mt-4 inline-block text-center"
              >
                {plan.button}
              </Link>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="text-center mt-16">
          <h4 className="text-2xl lg:text-3xl text-black mb-2">
            Payment Methods
          </h4>
          <div className="flex justify-center items-center gap-4 mb-1">
            <img
              src="/pricingDesign/cards.svg"
              alt="Payment Methods"
              className="h-6 object-contain"
            />
          </div>
          <p className="text-2xs mt-2 text-gray-400">
            We accept Visa, American Express, Mastercard, Paypal and Crypto
          </p>
        </div>

        {/* FAQ Section */}
        <section className="py-1 sm:py-2 mt-62">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-2 sm:mb-4">
              Frequently Asked
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-2 sm:mb-4">
              Questions
            </h2>
            <p className="text-black text-sm sm:text-lg mb-8 sm:mb-16">
              Everything you need to know before getting started
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  onClick={() => toggleFAQ(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`cursor-pointer transition-all duration-300 overflow-hidden rounded-2xl 
      ${index === 4 ? "md:col-span-2 md:mx-auto md:w-1/2" : ""}`}
                >
                  {/* Wrapper for Question + Answer */}
                  <div className="rounded-2xl overflow-hidden">
                    {/* Question Section */}
                    <div
                      className={`flex ${faq.QbgColor} p-6 justify-between items-center`}
                    >
                      <h3 className="text-sm sm:text-lg font-semibold text-black text-left flex-1 pr-2">
                        {faq.question}
                      </h3>
                      <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <ChevronDown
                          className={`w-3 sm:w-4 h-3 sm:h-4 text-green-600 transition-transform duration-300 ${
                            openFAQ === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Answer Section */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={
                        openFAQ === index
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`overflow-hidden ${faq.AbgColor}`}
                    >
                      <div className="p-4 pt-6 text-sm text-black text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Pricing;
