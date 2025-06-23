import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

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
        setTimeout(() => setIsDeleting(true), 2000);
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

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo_NoBackground" />
        <p className="Logo-text">Hoopoe Tech</p>
      </header>

      <div className="Typewriter-Container">
        <TypewriterText/>
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
          automation—one breakthrough at a time.
        </p>
      </div>
    </div>
  );
}

export default App;
