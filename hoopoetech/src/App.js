import "./index.css";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import FeaturesGrid from "./FeaturesGrid";
import StatsUI from "./StatsUI";
import NavBar from "./NavBar";

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzmwQD3mj9j5oUlnH9kguL5CN_ddbzqZ975-XS2sdwL4yxWFERY7spQzQi62a2gA4qC/exec";

function TypewriterText() {
  const texts = [
    "AI Automation",
    "Streamline workflows",
    "Enhance productivity",
    "Explode your growth",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullText = texts[currentTextIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
        setTypeSpeed(75);
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typeSpeed, texts]);

  return (
    <h1 className="text-5xl font-bold my-5 min-h-[80px] flex items-center justify-center text-white [text-shadow:0_0_10px_rgba(187,187,187,0.626),0_0_20px_rgba(108,108,108,0.3)]">
      {currentText}
      <span className="inline-block ml-[3px] animate-[blink_1s_infinite]">
        |
      </span>
    </h1>
  );
}

function ResultsChart() {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0]);

  const chartData = [
    { label: "Efficiency Gain", value: 85, color: "#eeeeee" },
    { label: "Cost Reduction", value: 60, color: "#cccccc" },
    { label: "Time Saved", value: 75, color: "#dddddd" },
    { label: "Revenue Growth", value: 45, color: "#bbbbbb" },
    { label: "Error Reduction", value: 90, color: "#ffffff" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(chartData.map((item) => item.value));
    }, 300); // Start animation after 300ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-[900px] h-[500px] bg-[rgba(18,18,18,0.8)] rounded-[15px] p-[30px] shadow-[0_8px_32px_rgba(255,255,255,0.3)] border border-[rgba(151,151,151,0.2)]" id="testimonials">
      <h2 className="text-white text-2xl font-bold text-center mb-[30px]">
        How Our AI Solutions Transform Businesses
      </h2>
      <div className="flex justify-around items-end h-[350px] py-5">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 max-w-[150px]"
          >
            <div className="text-white text-[0.9rem] font-bold text-center mb-[10px] min-h-[40px] flex items-center">
              {item.label}
            </div>
            <div className="h-[250px] w-[60px] bg-[rgba(255,255,255,0.1)] rounded-[8px] flex items-end mb-[10px] overflow-hidden">
              <div
                className="w-full rounded-[8px] transition-[height_1.5s_ease-out] shadow-[0_-2px_10px_rgba(131,131,131,0.4)]"
                style={{
                  height: `${animatedValues[index]}%`,
                  backgroundColor: item.color,
                  transitionDelay: `${index * 0.1}s`,
                }}
              ></div>
            </div>
            <div className="text-[#b7b7b7] text-[1.1rem] font-bold">
              {item.value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignUpSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting form data:", formData);

      // Method 1: Try fetch first
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log("Fetch method completed");

        // With no-cors, we assume success if no error is thrown
        setIsSubmitted(true);
        console.log("Form submitted successfully via fetch:", formData);
      } catch (fetchError) {
        console.log("Fetch failed, trying alternative method:", fetchError);

        // Method 2: Fallback to form submission
        await submitToGoogleScript(formData);
        setIsSubmitted(true);
        console.log("Form submitted successfully via form method:", formData);
      }

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "" });
      }, 5000);
    } catch (error) {
      console.error("All submission methods failed:", error);

      // Show user-friendly error message
      alert(`Sorry, there was an issue submitting your information. Please try again, or contact us directly at: contact@hoopoetech.com
      
Error details: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alternative form submission method for Google Apps Script
  function submitToGoogleScript(formData) {
    return new Promise((resolve, reject) => {
      // Create a hidden form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = GOOGLE_APPS_SCRIPT_URL;
      form.style.display = "none";

      // Add form fields
      Object.keys(formData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      });

      // Add form to document and submit
      document.body.appendChild(form);

      // Set a timeout to consider it successful after 3 seconds
      const timer = setTimeout(() => {
        document.body.removeChild(form);
        resolve({ status: "success" });
      }, 3000);

      form.addEventListener("error", () => {
        clearTimeout(timer);
        document.body.removeChild(form);
        reject(new Error("Form submission failed"));
      });

      form.submit();
    });
  }

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-b from-[#000000] to-[#5c5c5c] min-h-[70vh] flex items-center justify-center px-5 py-[60px]">
        <div className="max-w-[500px] w-full bg-[rgba(18,18,18,0.9)] rounded-[20px] p-10 shadow-[0_15px_35px_rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] max-md:p-[30px_20px]">
          <div className="text-center p-5">
            <h2 className="text-white text-2xl mb-[15px]">🎉 Thank You!</h2>
            <p className="text-[#e0e0e0] text-[1.1rem] leading-[1.6]">
              We've received your information and will contact you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#000000] to-[#5c5c5c] min-h-[70vh] flex items-center justify-center px-5 py-[60px]" id="contact">
      <div className="max-w-[500px] w-full bg-[rgba(18,18,18,0.9)] rounded-[20px] p-10 shadow-[0_15px_35px_rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] max-md:p-[30px_20px]">
        <h2 className="text-white text-[2.2rem] font-bold text-center mb-[15px] max-md:text-[1.8rem]">
          Ready to Transform Your Business?
        </h2>
        <p className="text-[#e0e0e0] text-[1.1rem] text-center mb-[30px] leading-[1.6]">
          Get in touch with us to discuss how our AI solutions can help your
          business grow.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-white text-base font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-[15px] text-base border-2 border-[rgba(255,255,255,0.3)] rounded-[10px] bg-[rgba(255,255,255,0.05)] text-white transition-all duration-300 ease-in-out placeholder-[#999999] focus:outline-none focus:border-white focus:ring-2 focus:ring-[#9f53c0]/20 focus:bg-[rgba(255,255,255,0.1)] max-md:p-3"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-white text-base font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-[15px] text-base border-2 border-[rgba(255,255,255,0.3)] rounded-[10px] bg-[rgba(255,255,255,0.05)] text-white transition-all duration-300 ease-in-out placeholder-[#999999] focus:outline-none focus:border-white focus:ring-2 focus:ring-[#9f53c0]/20 focus:bg-[rgba(255,255,255,0.1)] max-md:p-3"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-gradient-to-br from-[#808080] to-[#858585] text-white border-none px-[30px] py-[15px] text-[1.1rem] font-bold rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out mt-[10px] hover:bg-gradient-to-br hover:from-white hover:to-[#8b4aa8] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(159,83,192,0.4)] active:translate-y-0 submitting:bg-[#666666] submitting:cursor-not-allowed submitting:transform-none disabled:bg-[#666666] disabled:cursor-not-allowed max-md:p-3`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
        <div className="text-center overflow-x-hidden scrollbar-none" id="home">
          <header className="fixed left-0 right-0 z-50 bg-[#121212] min-h-[10vh] flex flex-row items-center justify-between text-[calc(10px+2vmin)] text-white gap-[15px]">
            <div className="flex flex-row gap-x-4 ml-4">
              <img
                src={logo}
                className="h-[5vmin] pointer-events-none motion-reduce:animate-[App-logo-spin_20s_linear_infinite]"
                alt="logo_NoBackground"
              />
              <p className="text-[25px] text-[#9f53c0] font-bold m-0 flex items-center">
                Hoopoe Tech
              </p>
            </div>
            <NavBar />
          </header>
          <div className="flex flex-col items-center justify-center h-[75vh] bg-black">
            <TypewriterText />
          </div>
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-black text-white px-5 py-10 mx-auto">
            <h2 className="text-[2.5rem] text-[#beb4c2] mb-[30px] text-center font-bold">
              About Hoopoe Tech
            </h2>
            <p className="text-[1.2rem] leading-[1.8] mb-5 text-center text-[#e0e0e0] max-w-[700px]">
              We transform businesses through intelligent AI automation,
              seamlessly integrating cutting-edge technology into your existing
              workflows. Our expertise spans across industries, delivering
              solutions that don't just enhance efficiency—they revolutionize
              how you operate.
            </p>
            <p className="text-[1.2rem] leading-[1.8] mb-5 text-center text-[#e0e0e0] max-w-[700px]">
              From streamlining complex operations to creating exceptional
              customer experiences, we unlock hidden opportunities that drive
              measurable growth. Our AI-powered solutions reduce operational
              costs while amplifying your competitive advantage.
            </p>
            <p className="text-[1.2rem] leading-[1.8] mb-5 text-center text-[#e0e0e0] max-w-[700px]">
              Partner with us to redefine what's possible. Together, we'll build
              the future of intelligent business automation—one breakthrough at
              a time.
            </p>
          </div>
          <FeaturesGrid />
          <StatsUI />
          <div className="flex flex-col items-center justify-center min-h-[70vh] bg-black text-white px-5 py-10">
            <ResultsChart />
          </div>
          <SignUpSection />
        </div>
  );
}

export default App;
