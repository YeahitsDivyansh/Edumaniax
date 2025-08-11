import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import AvatarSelection from "../components/AvatarSelection";
import Spline from "@splinetool/react-spline";

const Register = () => {
  const navigate = useNavigate();
  const {
    sendOtpForRegister,
    verifyOtpAndRegister,
    // You may need to add a separate verifyOtp method to your AuthContext
    // verifyOtp,
  } = useAuth();
  
  // flat formData
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phonenumber: "",
    userClass: "",
    gender: "",
    characterName: "",
    style: "",
    traits: [],
  });
  
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Focus states for floating labels
  const [focusStates, setFocusStates] = useState({
    name: false,
    age: false,
    userClass: false,
    characterName: false,
  });

  const handleFocus = (fieldName) => {
    setFocusStates(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleBlur = (fieldName) => {
    setFocusStates(prev => ({ ...prev, [fieldName]: false }));
  };

  const validateStep = (currentStep) => {
    const errs = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) errs.name = "Name is required";
      if (!formData.age) errs.age = "Age is required";
      else if (parseInt(formData.age) < 13)
        errs.age = "Must be at least 13 years old";
      if (!formData.phonenumber.trim())
        errs.phonenumber = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phonenumber))
        errs.phonenumber = "Enter a valid 10-digit phone number";
      if (!formData.userClass.trim())
        errs.userClass = "User class is required";
    }

    if (currentStep === 3) {
      if (!formData.gender) errs.gender = "Please select a gender";
      if (!formData.characterName.trim())
        errs.characterName = "Character name is required";
    }

    if (currentStep === 4) {
      if (!formData.style) errs.style = "Please select a character style";
    }

    if (currentStep === 5) {
      if (formData.traits.length !== 2)
        errs.traits = "Please select exactly 2 traits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handlers for input changes, traits toggle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((fd) => ({ ...fd, gender }));
  };

  const handleStyleSelect = (style) => {
    setFormData((fd) => ({ ...fd, style }));
  };

  const handleTraitSelect = (trait) => {
    let traits = [...formData.traits];
    const idx = traits.indexOf(trait);

    if (idx > -1) {
      traits.splice(idx, 1);
    } else {
      if (traits.length < 2) traits.push(trait);
      else {
        traits.shift();
        traits.push(trait);
      }
    }

    setFormData((fd) => ({ ...fd, traits }));
  };

  // Next button logic with OTP send after personal info step (step 1)
  const handleNext = async () => {
    if (!validateStep(step)) return;

    if (step === 1) {
      // Send OTP here before proceeding to OTP step
      setLoading(true);
      const updatedFormData = {
        ...formData,
        age: parseInt(formData.age, 10), // ensure age is number
      };
      try {
        const result = await sendOtpForRegister(updatedFormData.phonenumber);
        if (result.success) {
          console.log("OTP sent successfully");
          setOtpSent(true);
          setStep(step + 1); // move to OTP step
        } else {
          console.log("Failed to send OTP:", result.message);
        }
      } catch (error) {
        setErrors({ phonenumber: "Failed to send OTP. Try again." });
      } finally {
        setLoading(false);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setOtpInputs(["", "", "", "", "", ""]);
      setOtp("");
      setOtpError("");
    }
    setStep((s) => s - 1);
  };

  const handleOtpChange = (index, value) => {
    // Only allow numeric inputs
    if (value && !/^\d+$/.test(value)) return;

    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    setOtp(newOtpInputs.join(""));

    // Auto focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // OTP verify submit - just verify OTP, don't register yet
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setOtpError("");
    try {
      // TEMPORARY SOLUTION: Just mark as verified and continue
      // You'll need to implement actual OTP verification here

      // Option 1: Add a separate verifyOtp method to your AuthContext
      // if (verifyOtp) {
      //   const result = await verifyOtp(formData.phonenumber, otp);
      //   if (result.success) {
      //     setOtpVerified(true);
      //     setStep(3);
      //   } else {
      //     setOtpError(result.message || "Invalid OTP, please try again.");
      //   }
      // } else {

      // Option 2: For now, simulate verification (REPLACE THIS WITH REAL VERIFICATION)
      if (otp === "123456" || otp.length === 6) { // Replace with actual verification
        setOtpVerified(true);
        setStep(3);
      } else {
        setOtpError("Invalid OTP, please try again.");
      }
      // }

    } catch (error) {
      setOtpError("Invalid OTP, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Complete registration - called from step 6
  const handleCompleteRegistration = async () => {
    setLoading(true);
    try {
      const finalFormData = {
        phonenumber: formData.phonenumber,
        name: formData.name,
        age: parseInt(formData.age, 10),
        userClass: formData.userClass,
        characterGender: formData.gender,
        characterName: formData.characterName,
        characterStyle: formData.style,
        characterTraits: formData.traits,
      };

      // Since OTP is already verified, you might need a different method here
      // like updateUserProfile or completeRegistration
      // For now, using the existing method but this might need backend changes
      const result = await verifyOtpAndRegister(finalFormData, otp, navigate);
      if (!result.success) {
        console.error("Registration failed:", result.message);
      }
      // On success, navigate happens inside verifyOtpAndRegister
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const traitImages = {
    Creative: "/Creative.svg",
    Talkative: "/Talkative.svg",
    Smart: "/Smart.svg",
    Curious: "/Curious.svg",
    Logical: "/Logical.svg",
    Mystery: "/Mystery.svg",
  };

  return (
    <div className="min-h-screen flex">
      {/* Desktop background image - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 items-center bg-[url('/Registeration.svg')] object-contain bg-cover bg-center bg-no-repeat justify-center p-8">
      </div>


      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <Link to="/" className="flex items-center -gap-1">
                  <img
                    src="/loginPageDesign/EduManiax_Logo.svg"
                    alt="Edumaniax Logo"
                    className="h-20 w-auto"
                  />
                  <h1 className="text-white -mt-1 text-2xl lg:text-3xl font-bold">
                    Edumaniax
                  </h1>
                </Link>
              </div>

      {/* Form container - responsive width */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-4">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 lg:hidden">
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src="/loginPageDesign/phoneViewIcon.svg"
                    alt="Edumaniax Mobile Logo"
                    className="h-10 w-auto"
                  />
                  <span className="text-green-500 text-xl lg:text-2xl font-bold leading-none">
                    Edumaniax
                  </span>
                </Link>
              </div>
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-[70%] transition-all duration-500">

          {/* Progress bar - responsive spacing */}
          {step >= 3 && (
            <div className="w-full bg-gray-200 h-2 rounded-full mt-4 mx-4 sm:mx-6 lg:mt-4 mb-4 sm:mb-6" style={{ width: 'calc(100% - 2rem)' }}>
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  step === 3
                    ? "w-1/3 bg-green-500"
                    : step === 4
                    ? "w-2/3 bg-green-500"
                    : step >= 5
                    ? "w-full bg-green-600"
                    : "w-0"
                }`}
              ></div>
            </div>
          )}

          <form onSubmit={step === 2 ? handleOtpSubmit : (e) => e.preventDefault()} className="px-4 sm:px-6 lg:px-5">
            {step === 1 && (
              <div>
                <div className="space-y-3 sm:space-y-4 animate-fade-in">
                  {/* Header section - responsive text */}
                  <div className="flex flex-col gap-2 mb-4 sm:mb-6">
                    <h1 className="text-[#006724] text-lg sm:text-xl md:text-2xl lg:text-4xl leading-tight"
                      style={{ fontFamily: '"Sigmar", sans-serif' }}>
                      Register Yourself
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Welcome! Register to start your journey with us. Amazing experiences await.
                    </p>
                  </div>

                  {/* Phone number field */}
                  <div className="relative w-full">
                    <label
                      htmlFor="phonenumber"
                      className={`absolute left-3 px-1 bg-white transition-all duration-200 z-10
                        ${isFocused || formData.phonenumber
                          ? "text-[10px] -top-2 text-green-700"
                          : "text-sm top-[14px] text-gray-400"
                        }`}
                    >
                      Phone Number
                    </label>

                    <div
                      className={`flex items-center border-2 rounded-lg px-3 py-3 gap-2 transition-all duration-200 ${
                        isFocused ? "border-green-700" : "border-green-600"
                      }`}
                    >
                      {(isFocused || formData.phonenumber) && (
                        <>
                          <img
                            src="/loginPageDesign/indianNumber.svg"
                            alt="India"
                            className="w-5 h-5"
                          />
                          <span className="text-gray-800 font-medium text-sm">+91</span>
                        </>
                      )}

                      <input
                        type="tel"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        placeholder=" "
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`peer w-full bg-transparent text-sm focus:outline-none 
                          ${errors.phonenumber ? "text-red-600" : "text-gray-900"}`}
                      />
                    </div>

                    {errors.phonenumber && (
                      <p className="mt-1 text-xs text-red-600">{errors.phonenumber}</p>
                    )}
                  </div>

                  {/* Name field with floating label */}
                  <div className="relative w-full">
                    <label
                      htmlFor="name"
                      className={`absolute left-3 px-1 bg-white transition-all duration-200 z-10
                        ${focusStates.name || formData.name
                          ? "text-[10px] -top-2 text-green-700"
                          : "text-sm top-[14px] text-gray-400"
                        }`}
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      className={`w-full border-2 rounded-lg px-3 py-3 text-sm focus:outline-none transition-all duration-200
                        ${focusStates.name ? "border-green-700" : "border-green-600"}
                        ${errors.name ? "text-red-600" : "text-gray-900"}`}
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Age field with floating label */}
                  <div className="relative w-full">
                    <label
                      htmlFor="age"
                      className={`absolute left-3 px-1 bg-white transition-all duration-200 z-10
                        ${focusStates.age || formData.age
                          ? "text-[10px] -top-2 text-green-700"
                          : "text-sm top-[14px] text-gray-400"
                        }`}
                    >
                      Age
                    </label>

                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder=" "
                      onFocus={() => handleFocus('age')}
                      onBlur={() => handleBlur('age')}
                      className={`w-full border-2 rounded-lg px-3 py-3 text-sm focus:outline-none transition-all duration-200
                        ${focusStates.age ? "border-green-700" : "border-green-600"}
                        ${errors.age ? "text-red-600" : "text-gray-900"}`}
                    />

                    {errors.age && (
                      <p className="mt-1 text-xs text-red-600">{errors.age}</p>
                    )}
                  </div>

                  {/* Class field with floating label */}
                  <div className="relative w-full">
                    <label
                      htmlFor="userClass"
                      className={`absolute left-3 px-1 bg-white transition-all duration-200 z-10
                        ${focusStates.userClass || formData.userClass
                          ? "text-[10px] -top-2 text-green-700"
                          : "text-sm top-[14px] text-gray-400"
                        }`}
                    >
                      Class
                    </label>

                    <select
                      id="userClass"
                      name="userClass"
                      value={formData.userClass}
                      onChange={handleChange}
                      onFocus={() => handleFocus('userClass')}
                      onBlur={() => handleBlur('userClass')}
                      className={`w-full border-2 rounded-lg px-3 py-3 text-sm focus:outline-none transition-all duration-200 appearance-none bg-white
                        ${focusStates.userClass ? "border-green-700" : "border-green-600"}
                        ${errors.userClass ? "text-red-600" : "text-gray-900"}`}
                    >
                      <option value=""></option>
                      <option value="6th">6th</option>
                      <option value="7th">7th</option>
                      <option value="8th">8th</option>
                      <option value="9th">9th</option>
                      <option value="10th">10th</option>
                      <option value="11th">11th</option>
                      <option value="12th">12th</option>
                    </select>

                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {errors.userClass && (
                      <p className="mt-1 text-xs text-red-600">{errors.userClass}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center space-y-4 sm:space-y-6 animate-fade-in py-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">OTP Verification</h2>
                <p className="text-xs sm:text-sm text-gray-600 text-center px-2">
                  We've sent an OTP to {formData.phonenumber}.
                </p>

                {/* OTP inputs - responsive sizing */}
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otpInputs.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
                {otpError && <p className="text-xs sm:text-sm text-red-600 text-center">{otpError}</p>}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-black mb-2">
                    Select the gender of character
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                    With the help of this information we can create a personalized character
                  </p>
                </div>

                {/* Gender selection - responsive grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {["Male", "Female"].map((gender) => (
                    <div
                      key={gender}
                      onClick={() => handleGenderSelect(gender)}
                      className={`cursor-pointer px-3 py-3 sm:py-4 rounded-lg flex items-center justify-center transition-all ${
                        formData.gender === gender
                          ? "bg-green-100 border-2 border-green-500"
                          : "bg-gray-50 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <img
                        src={gender === "Male" ? "/boy.svg" : "/girl.svg"}
                        alt={gender}
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 object-contain"
                      />
                      <span className="text-sm font-medium">{gender}</span>
                    </div>
                  ))}
                </div>

                {errors.gender && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.gender}</p>
                )}

                {/* Character name input with floating label */}
                <div className="relative w-full">
                  <label
                    htmlFor="characterName"
                    className={`absolute left-3 px-1 bg-white transition-all duration-200 z-10
                      ${focusStates.characterName || formData.characterName
                        ? "text-[10px] -top-2 text-green-700"
                        : "text-sm top-[14px] text-gray-400"
                      }`}
                  >
                    What's your character's name?
                  </label>

                  <input
                    type="text"
                    id="characterName"
                    name="characterName"
                    value={formData.characterName}
                    onChange={handleChange}
                    placeholder=" "
                    onFocus={() => handleFocus('characterName')}
                    onBlur={() => handleBlur('characterName')}
                    className={`w-full border-2 rounded-lg px-3 py-3 text-sm focus:outline-none transition-all duration-200
                      ${focusStates.characterName ? "border-green-700" : "border-green-600"}
                      ${errors.characterName ? "text-red-600" : "text-gray-900"}`}
                  />

                  {errors.characterName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.characterName}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    Select character Style
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Choose your character's style
                  </p>
                </div>

                <AvatarSelection
                  selectedStyle={formData.style}
                  onSelectStyle={handleStyleSelect}
                  gender={formData.gender}
                />

                {errors.style && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.style}</p>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    Character Traits
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Pick 2 traits that describe your character best
                  </p>
                </div>

                {/* Traits grid - responsive layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    "Creative",
                    "Curious",
                    "Talkative",
                    "Logical",
                    "Smart",
                    "Mystery",
                  ].map((trait) => (
                    <div
                      key={trait}
                      onClick={() => handleTraitSelect(trait)}
                      className={`cursor-pointer p-2 sm:p-3 rounded-lg transition-all ${
                        formData.traits.includes(trait)
                          ? "bg-green-100 border-2 border-green-500"
                          : "bg-gray-50 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <div className="text-center">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={traitImages[trait] || "/default.png"}
                            alt={trait}
                            className="w-8 h-8 sm:w-12 sm:h-12 lg:w-15 lg:h-15 object-cover mb-1 sm:mb-2"
                          />
                          <p className="font-medium text-xs sm:text-sm text-black">
                            {trait}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {errors.traits && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.traits}</p>
                )}
              </div>
            )}

            {/* Buttons section - responsive sizing */}
            <div className="flex justify-center mt-6 sm:mt-8 mb-4 sm:mb-6">
              {step === 1 && (
                <div className="flex flex-col items-center w-full">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className={`w-full sm:w-auto px-8 sm:px-16 lg:px-38 py-2.5 sm:py-3 bg-[#068F36] text-white text-sm rounded-md transition-colors ${
                      loading ? "opacity-70 cursor-not-allowed" : "hover:cursor-pointer"
                    }`}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                  <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-8 sm:px-20 lg:px-40 py-2.5 sm:py-3 bg-[#068F36] text-white text-sm rounded-md transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:cursor-pointer"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify"}
                </button>
              )}

              {(step === 3 || step === 4) && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 sm:px-20 lg:px-40 py-2.5 sm:py-3 bg-[#068F36] text-white text-sm rounded-md transition-colors hover:cursor-pointer"
                >
                  Next →
                </button>
              )}

              {step === 5 && (
                <button
                  type="button"
                  onClick={handleCompleteRegistration}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[#068F36] text-white text-sm rounded-md transition-colors hover:cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? "Creating..." : "Create Character"}
                  <img className="h-3 w-3 sm:h-4 sm:w-4" src="/sparkle.svg" alt="sparkle" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;