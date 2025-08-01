import React, { useState, useEffect } from 'react';

const Header = ({ title, subtitle, backgroundColor, textColor, logo, showLogo }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <header 
      className="header-component"
      style={{ 
        padding: isMobile ? '15px' : '20px', 
        background: backgroundColor || '#f8f9fa', 
        borderRadius: '8px', 
        textAlign: 'center',
        color: textColor || '#333'
      }}
    >
      {showLogo && logo && (
        <img 
          src={logo} 
          alt="Logo" 
          style={{ 
            height: isMobile ? '30px' : '40px', 
            marginBottom: '15px' 
          }} 
        />
      )}
      <h2 style={{ 
        marginBottom: '10px', 
        fontSize: isMobile ? '1.5rem' : '2rem', 
        fontWeight: '600' 
      }}>
        {title || 'Welcome'}
      </h2>
      <p style={{ 
        fontSize: isMobile ? '1rem' : '1.1rem', 
        opacity: 0.8, 
        margin: 0 
      }}>
        {subtitle || 'Custom header content'}
      </p>
    </header>
  );
};

export default Header; 