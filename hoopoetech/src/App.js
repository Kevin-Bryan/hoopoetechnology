import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzmwQD3mj9j5oUlnH9kguL5CN_ddbzqZ975-XS2sdwL4yxWFERY7spQzQi62a2gA4qC/exec";

function TypewriterText() {
  const texts = [
    "AI Automation",
    "Streamline workflows",
    "Enhance productivity",
    "Unlock new growth potential"
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        setTypeSpeed(75);
      } else {
        setCurrentText(prev => fullText.substring(0, prev.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typeSpeed, texts]);

  return (
    <h1 className="typewriter-text">
      {currentText}
      <span className="cursor">|</span>
    </h1>
  );
}

function ResultsChart() {
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0, 0]);
  
  const chartData = [
    { label: 'Efficiency Gain', value: 85, color: '#eeeeee' },
    { label: 'Cost Reduction', value: 60, color: '#cccccc' },
    { label: 'Time Saved', value: 75, color: '#dddddd' },
    { label: 'Revenue Growth', value: 45, color: '#bbbbbb' },
    { label: 'Error Reduction', value: 90, color: '#ffffff' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(chartData.map(item => item.value));
    }, 300); // Start animation after 300ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title">How Our AI Solutions Transform Businesses</h2>
      <div className="custom-bar-chart">
        {chartData.map((item, index) => (
          <div key={index} className="bar-item">
            <div className="bar-label">{item.label}</div>
            <div className="bar-wrapper">
              <div 
                className="bar-fill" 
                style={{
                  height: `${animatedValues[index]}%`,
                  backgroundColor: item.color,
                  transitionDelay: `${index * 0.1}s`
                }}
              ></div>
            </div>
            <div className="bar-value">{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignUpSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      
      // Method 1: Try fetch first
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        console.log('Fetch method completed');
        
        // With no-cors, we assume success if no error is thrown
        setIsSubmitted(true);
        console.log('Form submitted successfully via fetch:', formData);
        
      } catch (fetchError) {
        console.log('Fetch failed, trying alternative method:', fetchError);
        
        // Method 2: Fallback to form submission
        await submitToGoogleScript(formData);
        setIsSubmitted(true);
        console.log('Form submitted successfully via form method:', formData);
      }

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '' });
      }, 5000);

    } catch (error) {
      console.error('All submission methods failed:', error);
      
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
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_APPS_SCRIPT_URL;
      form.style.display = 'none';

      // Add form fields
      Object.keys(formData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      });

      // Add form to document and submit
      document.body.appendChild(form);
      
      // Set a timeout to consider it successful after 3 seconds
      const timer = setTimeout(() => {
        document.body.removeChild(form);
        resolve({ status: 'success' });
      }, 3000);

      form.addEventListener('error', () => {
        clearTimeout(timer);
        document.body.removeChild(form);
        reject(new Error('Form submission failed'));
      });

      form.submit();
    });
  }

  if (isSubmitted) {
    return (
      <div className="signup-section">
        <div className="signup-container">
          <div className="success-message">
            <h2>🎉 Thank You!</h2>
            <p>We've received your information and will contact you soon.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-section">
      <div className="signup-container">
        <h2 className="signup-title">Ready to Transform Your Business?</h2>
        <p className="signup-subtitle">
          Get in touch with us to discuss how our AI solutions can help your business grow.
        </p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >            {isSubmitting ? 'Sending...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo_NoBackground" />
        <p className="Logo-text">Hoopoe Tech</p>
      </header>      <div className="Typewriter-Container">
        <TypewriterText/>
      </div>      
      
      <div className="App-Results">
        <ResultsChart />
      </div>

      <div className="App-AboutUs">
        <h2 className="AboutUs-title">About Hoopoe Tech</h2>
        <p className="AboutUs-text">
          We transform businesses through intelligent AI automation, seamlessly integrating cutting-edge technology 
          into your existing workflows. Our expertise spans across industries, delivering solutions that don't just 
          enhance efficiency—they revolutionize how you operate.
        </p>
        <p className="AboutUs-text">
          From streamlining complex operations to creating exceptional customer experiences, we unlock hidden 
          opportunities that drive measurable growth. Our AI-powered solutions reduce operational costs while 
          amplifying your competitive advantage.
        </p>
        <p className="AboutUs-text">
          Partner with us to redefine what's possible. Together, we'll build the future of intelligent business 
          automation—one breakthrough at a time.        </p>
      </div>

      <SignUpSection />
    </div>
  );
}

export default App;
