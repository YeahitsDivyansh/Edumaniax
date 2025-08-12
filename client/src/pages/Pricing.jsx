import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Hero from "@/PricingDesign/Hero";
import { useAuth } from "@/contexts/AuthContext";
import { useAccessControl } from "../utils/accessControl";

const plans = [
  {
    title: "STARTER PLAN",
    price: "₹0",
    frequency: "7 Days Free Trial",
    description: "Perfect to explore and get started.",
    features: [
      "Access to 1 free game/module",
      "Notes for the selected module",
      "Access to basic learning tools",
      "7 days trial period",
      { text: "No access to premium modules", excluded: true },
      { text: "No AI powered personalized assessment", excluded: true },
      { text: "No completion certificates", excluded: true },
    ],
    button: "Start Free Trial",
  },
  {
    title: "SOLO PLAN",
    price: "₹199",
    frequency: "Per member, per 1 Month",
    description: "Ideal for focused learning on a specific topic.",
    features: [
      "Access to 1 premium module of choice",
      "Trial access to first challenge in other modules",
      "Notes for the selected module",
      "Interactive activities and assessments",
      "Completion certificates",
      { text: "No access to all premium modules", excluded: true },
      { text: "No AI powered personalized assessment", excluded: true },
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
      "Completion certificates for all modules",
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
      "Don’t worry at all. EduManiax offers a refund as per the package bought, which you can get in your bank once your request is processed. Before enrolling, you will also get a full demo of the platform, personalized one-on-one interaction, and access to our support team to help you at every step.",
    QbgColor: "bg-[#6DEE0E]", // Vivid green
    AbgColor: "bg-[#E9FCD4]", // 🍏 Light green pastel
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! EduManiax currently offers a free trial of one module of a course of your choice that grants access to all premium features.",
    QbgColor: "bg-[#FFE7A1]", // Soft yellow
    AbgColor: "bg-[#FFFBE5]", // ☀️ Pale yellow pastel
  },
  {
    question: "What is EduManiax?",
    answer:
      "EduManiax is a gamified learning platform for students in Classes 6 to 12 across India. It teaches essential 21st-century skills like AI, finance, law, communication, and entrepreneurship through interactive, story-based modules designed to make learning fun and practical.",
    QbgColor: "bg-[#DBEDFB]", // Light blue
    AbgColor: "bg-[#F0F9FF]", // ❄️ Icy sky blue
  },
  {
    question: "Who is EduManiax for?",
    answer:
      "Our programs are designed for school students (Classes 6–12), parents seeking skill-based education, and schools in cities like Delhi, Lucknow, Bengaluru, and Jaipur that want to integrate NEP 2020-aligned content into their curriculum.",
    QbgColor: "bg-[#DABFFF]", // Lavender
    AbgColor: "bg-[#F5EBFF]", // 🪻 Soft lavender haze
  },
  {
    question: "What will students learn?",
    answer:
      "Students gain hands-on skills in AI tools, prompt engineering, legal awareness, investing, entrepreneurship, and public speaking. Each course delivers clear learning outcomes that build creativity, confidence, and future career readiness.",
    QbgColor: "bg-[#FEC6C7]", // Soft pink
    AbgColor: "bg-[#FFF1F2]", // 🌸 Ultra-light pink
  },
  {
    question: "How does EduManiax assess student progress?",
    answer:
      "We use AI-driven assessments that adapt to each learner’s pace, offer real-time feedback, and generate detailed performance reports for parents and schools. The focus is on applied learning, not just marks.",
    QbgColor: "bg-[#A8E6CF]", // Mint green
    AbgColor: "bg-[#EAFBF3]", // 🌿 Pale mint pastel
  },
  {
    question: "How is EduManiax different from regular edtech apps?",
    answer:
      "Unlike video-based apps, EduManiax turns learning into games and quests. Students complete challenges, earn rewards, and build real-world skills through simulations—making learning immersive and unforgettable.",
    QbgColor: "bg-[#FFD6A5]", // Peach
    AbgColor: "bg-[#FFF4E6]", // 🍑 Light peach pastel
  },
  {
    question: "Is EduManiax aligned with the school curriculum?",
    answer:
      "Yes, our modules are mapped to NEP 2020 guidelines and complement school subjects like civics, coding, and economics, ensuring students stay ahead without adding academic pressure.",
    QbgColor: "bg-[#B5EAEA]", // Aqua
    AbgColor: "bg-[#E6FAFA]", // 🌊 Light aqua pastel
  },
  {
    question: "Do students receive certificates?",
    answer:
      "Yes, learners receive digital certificates after completing modules, which are valuable for portfolios, internships, and college applications.",
    QbgColor: "bg-[#FFB7B2]", // Coral pink
    AbgColor: "bg-[#FFEDEC]", // 🌷 Light coral pastel
  },
  {
    question: "Can schools partner with EduManiax?",
    answer:
      "Absolutely. Schools and institutes can integrate our programs during school hours or as weekend clubs. We offer dashboards, training, and ongoing support for seamless implementation.",
    QbgColor: "bg-[#C7CEEA]", // Periwinkle
    AbgColor: "bg-[#F2F4FF]", // 🌌 Soft periwinkle pastel
  },
];

const Pricing = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Use access control with full subscription data
  const accessControl = useAccessControl(subscriptions, selectedModule);

  // Fetch user subscription data
  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/payment/subscriptions/${user.id}`
        );
        
        if (response.ok) {
          const subscriptionData = await response.json();
          setSubscriptions(Array.isArray(subscriptionData) ? subscriptionData : []);
          
          // Find the highest active and valid subscription
          const activeSubscriptions = Array.isArray(subscriptionData) 
            ? subscriptionData.filter(sub => 
                sub.status === 'ACTIVE' && new Date(sub.endDate) > new Date()
              )
            : [];
          
          // Define plan hierarchy to find the highest plan
          const planHierarchy = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];
          
          let highestActiveSubscription = null;
          
          // Find the highest tier among active and valid subscriptions
          for (const plan of planHierarchy.reverse()) {
            const subscription = activeSubscriptions.find(sub => sub.planType === plan);
            if (subscription) {
              highestActiveSubscription = subscription;
              break;
            }
          }
          
          // If we found a highest active subscription, handle module selection for SOLO plans
          if (highestActiveSubscription && highestActiveSubscription.notes) {
            // Parse notes to get selectedModule if it exists
            let selectedModuleFromSub = null;
            try {
              const parsedNotes = JSON.parse(highestActiveSubscription.notes);
              const rawModule = parsedNotes.selectedModule;
              
              // Map the display name to the correct module key
              const moduleMapping = {
                   'Fundamentals of Finance': 'finance',
                   'Computer Science': 'computers', 
                    'Fundamentals of Law': 'law',
                    'Communication Mastery': 'communication',
                    'Entrepreneurship Bootcamp': 'entrepreneurship',
                    'Digital Marketing Pro': 'digital-marketing',
                    'Leadership & Adaptability': 'leadership', 
                    'Environmental Sustainability': 'environment',
                    'Wellness & Mental Health': 'sel',
                };
              
              selectedModuleFromSub = moduleMapping[rawModule] || rawModule?.toLowerCase();
            } catch {
              // If notes is not JSON, treat as plain text and map it
              const moduleMapping = {
                   'Fundamentals of Finance': 'finance',
                   'Computer Science': 'computers', 
                    'Fundamentals of Law': 'law',
                    'Communication Mastery': 'communication',
                    'Entrepreneurship Bootcamp': 'entrepreneurship',
                    'Digital Marketing Pro': 'digital-marketing',
                    'Leadership & Adaptability': 'leadership', 
                    'Environmental Sustainability': 'environment',
                    'Wellness & Mental Health': 'sel',
                };
              
              selectedModuleFromSub = moduleMapping[highestActiveSubscription.notes] || highestActiveSubscription.notes?.toLowerCase();
            }
            
            setSelectedModule(selectedModuleFromSub);
          }
        }
      } catch (error) {
        console.error('Error fetching subscriptions in pricing:', error);
        setSubscriptions([]);
      }
    };

    fetchUserSubscriptions();

    // Listen for subscription updates from payment completion
    const handleSubscriptionUpdate = (event) => {
      console.log('Pricing: Subscription updated event received:', event.detail);
      fetchUserSubscriptions(); // Re-fetch subscription data
    };

    window.addEventListener('subscriptionUpdated', handleSubscriptionUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener('subscriptionUpdated', handleSubscriptionUpdate);
    };
  }, [user?.id]);
  
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Function to check if a plan is the user's current plan
  const isCurrentPlan = (planTitle) => {
    if (!user || !accessControl.currentPlan) return false;
    
    const planType = planTitle.replace(' PLAN', '');
    return accessControl.currentPlan === planType;
  };

  // Function to check if a plan should be grayed out (already purchased or lower tier)
  const shouldGrayOut = (planTitle) => {
    if (!user || !accessControl.currentPlan) return false;
    
    const targetPlanType = planTitle.replace(' PLAN', '');
    
    // Define plan hierarchy
    const planHierarchy = ['STARTER', 'SOLO', 'PRO', 'INSTITUTIONAL'];
    const currentIndex = planHierarchy.indexOf(accessControl.currentPlan);
    const targetIndex = planHierarchy.indexOf(targetPlanType);
    
    // Gray out current plan and all lower tier plans, but with special case for SOLO
    if (targetPlanType === 'SOLO' && accessControl.currentPlan === 'SOLO') {
      // For SOLO plans, only gray out if all modules are purchased
      const availableModules = accessControl.getAvailableForPurchase();
      return availableModules.length === 0;
    }
    
    return targetIndex <= currentIndex;
  };

  // Function to get button text based on plan status
  const getButtonText = (plan) => {
    const planType = plan.title.replace(' PLAN', '');
    
    if (plan.title === "STARTER PLAN") return "Free Forever";
    
    // Special handling for SOLO plan
    if (planType === 'SOLO') {
      if (accessControl.currentPlan === 'SOLO') {
        const availableModules = accessControl.getAvailableForPurchase();
        if (availableModules.length > 0) {
          return "Purchase Another Module";
        } else {
          return "All Modules Purchased";
        }
      }
      // For non-SOLO users
      return "Start Now";
    }
    
    if (isCurrentPlan(plan.title)) return "Current Plan";
    if (shouldGrayOut(plan.title)) return "Already Owned";
    return plan.button;
  };

  // Function to check if button should be disabled
  const isButtonDisabled = (plan) => {
    const planType = plan.title.replace(' PLAN', '');
    
    if (plan.title === "STARTER PLAN") return true;
    
    // Special handling for SOLO plan
    if (planType === 'SOLO' && accessControl.currentPlan === 'SOLO') {
      const availableModules = accessControl.getAvailableForPurchase();
      return availableModules.length === 0; // Disable only if no modules left to purchase
    }
    
    return shouldGrayOut(plan.title);
  };

  // Function to get upgrade suggestion for current plan users
  const getUpgradeSuggestion = (plan) => {
    const planType = plan.title.replace(' PLAN', '');
    
    if (!user) return null;
    
    if (plan.title === "STARTER PLAN" && accessControl.currentPlan === 'STARTER') {
      return "Upgrade to SOLO for premium access";
    }
    
    if (planType === "SOLO") {
      if (accessControl.currentPlan === 'SOLO') {
        const availableModules = accessControl.getAvailableForPurchase();
        const purchasedModules = accessControl.getPurchasedModules();
        
        if (availableModules.length > 0) {
          return `${purchasedModules.length} module${purchasedModules.length > 1 ? 's' : ''} purchased. ${availableModules.length} more available`;
        } else {
          return "All modules purchased! Consider PRO for AI features";
        }
      }
    }
    
    if (plan.title === "PRO PLAN" && accessControl.currentPlan === 'PRO') {
      return "Upgrade to INSTITUTIONAL for live sessions";
    }
    
    return null;
  };

  // Function to handle plan selection click
  const handlePlanClick = (plan) => {
    if (isButtonDisabled(plan)) return;
    
    const planType = plan.title.replace(' PLAN', '');
    
    // Special handling for SOLO plan when user already has SOLO
    if (planType === 'SOLO' && accessControl.currentPlan === 'SOLO') {
      const availableModules = accessControl.getAvailableForPurchase();
      
      if (availableModules.length > 0) {
        // Navigate to payment with indication that this is an additional module purchase
        navigate(`/payment?plan=SOLO&additional=true`);
        return;
      }
    }
    
    // Regular navigation for other cases
    navigate(`/payment?plan=${planType}`);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative z-0">
        <Hero />
      </div>

      {/* Pricing Cards */}
      <section className="relative z-10 bg-transparent -mt-40 px-4 pt-16 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white shadow-xl rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative ${
                isCurrentPlan(plan.title)
                  ? "border-green-500 ring-2 ring-green-200 bg-green-50"
                  : shouldGrayOut(plan.title) && !isCurrentPlan(plan.title)
                  ? "border-gray-400 bg-gray-50"
                  : plan.title === "PRO PLAN"
                  ? "border-[#068F36]"
                  : "border-gray-200 hover:border-[#068F36]"
              }`}
            >
              {/* Tags */}
              <div className="relative mb-4">
                {isCurrentPlan(plan.title) && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                    ✓ Current Plan
                  </div>
                )}
                {shouldGrayOut(plan.title) && !isCurrentPlan(plan.title) && (
                  <div className="absolute -top-3 -right-3 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                    ✓ Owned
                  </div>
                )}
                {plan.title === "PRO PLAN" && !isCurrentPlan(plan.title) && !shouldGrayOut(plan.title) && (
                  <img
                    src="/pricingDesign/save20.svg"
                    alt="Save 20%"
                    className="absolute -mt-9 -mr-7 -top-0 left-32 w-[113px] h-[49px] z-10"
                  />
                )}
                {plan.tag && !isCurrentPlan(plan.title) && !shouldGrayOut(plan.title) && (
                  <span className="bg-[#EFB100] text-black text-xs font-bold px-2 py-1 rounded w-fit shadow">
                    {plan.tag}
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div className="flex justify-start">
                <h3
                  className="text-xs font-bold uppercase text-[#007127] px-3 py-1 rounded"
                  style={{ backgroundColor: "rgba(165, 237, 110, 0.31)" }}
                >
                  {plan.title}
                </h3>
              </div>
              <p className="text-sm text-black mt-2">{plan.description}</p>
              <hr className="my-3 border-gray-300" />
              <p className="text-4xl font-extrabold text-[#042038] mt-1">
                {plan.title === "PRO PLAN" && accessControl.currentPlan === 'SOLO' && accessControl.soloModules.length > 0 ? (
                  <span>
                    <span className="text-2xl line-through text-gray-500">₹1433</span>
                    <br />
                    <span className="text-green-600">₹{accessControl.calculateUpgradePrice('PRO').totalPrice}</span>
                  </span>
                ) : (
                  plan.price
                )}
              </p>
              {plan.title === "PRO PLAN" && accessControl.currentPlan === 'SOLO' && accessControl.soloModules.length > 0 && (
                <p className="text-xs text-green-600 font-semibold mt-1">
                  Save ₹{accessControl.calculateUpgradePrice('PRO').soloDiscount} from your SOLO plans!
                </p>
              )}
              <p className="text-xs text-black font-semibold mt-1">
                {plan.frequency}
              </p>
              <hr className="my-3 border-gray-300 mt-5" />

              {/* Features */}
              <ul className="text-sm space-y-2 flex-1 mt-2">
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
                      <span className={excluded ? "text-red-600" : ""}>
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <button
                onClick={() => handlePlanClick(plan)}
                className={`font-semibold py-2 px-4 rounded-md transition mt-4 inline-block text-center w-full ${
                  isCurrentPlan(plan.title)
                    ? "bg-green-500 text-white cursor-default"
                    : shouldGrayOut(plan.title) && !isCurrentPlan(plan.title)
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : isButtonDisabled(plan)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#068F36] text-white hover:brightness-110"
                }`}
                disabled={isButtonDisabled(plan)}
              >
                {getButtonText(plan)}
              </button>

              {/* Upgrade suggestion for current plan users or special SOLO case */}
              {(isCurrentPlan(plan.title) || (plan.title === "SOLO PLAN" && accessControl.currentPlan === 'SOLO')) && getUpgradeSuggestion(plan) && (
                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-600 mb-2">{getUpgradeSuggestion(plan)}</p>
                  {plan.title === "SOLO PLAN" && accessControl.currentPlan === 'SOLO' && accessControl.getAvailableForPurchase().length === 0 ? (
                    <button
                      onClick={() => navigate(`/payment?plan=PRO`)}
                      className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full hover:from-orange-600 hover:to-red-600 transition duration-300"
                    >
                      Upgrade to PRO
                    </button>
                  ) : isCurrentPlan(plan.title) ? (
                    <button
                      onClick={() => navigate(`/payment?plan=${
                        plan.title === "STARTER PLAN" ? "SOLO" :
                        plan.title === "SOLO PLAN" ? "PRO" :
                        plan.title === "PRO PLAN" ? "INSTITUTIONAL" : ""
                      }`)}
                      className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full hover:from-orange-600 hover:to-red-600 transition duration-300"
                    >
                     Upgrade Now
                    </button>
                  ) : null}
                </div>
              )}
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
            <img
              src="/pricingDesign/UPI-Logo-vector.svg"
              alt="UPI"
              className="h-6 object-contain -ml-2"
            />
          </div>
          <p className="text-2xs mt-2 text-gray-400">
            We accept Visa, American Express, Mastercard,
            <br className="block sm:hidden" />
            Paypal, UPI and more.
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

            {/* Split FAQs into two equal columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqData
                .reduce((result, item, index) => {
                  const colIndex =
                    index < Math.ceil(faqData.length / 2) ? 0 : 1;
                  if (!result[colIndex]) result[colIndex] = [];
                  result[colIndex].push(item);
                  return result;
                }, [])
                .map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-4">
                    {column.map((faq, index) => (
                      <motion.div
                        key={index}
                        onClick={() =>
                          toggleFAQ(
                            index + colIndex * Math.ceil(faqData.length / 2)
                          )
                        }
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="cursor-pointer transition-all duration-300 overflow-hidden rounded-2xl"
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
                                  openFAQ ===
                                  index +
                                    colIndex * Math.ceil(faqData.length / 2)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </div>
                          </div>

                          {/* Answer Section */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={
                              openFAQ ===
                              index + colIndex * Math.ceil(faqData.length / 2)
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
                ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Pricing;
