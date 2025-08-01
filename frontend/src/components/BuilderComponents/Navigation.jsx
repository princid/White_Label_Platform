import React, { useState } from 'react';

const Navigation = ({ 
  brand, 
  menuItems = ['Home', 'Products', 'Contact'], 
  backgroundColor, 
  textColor,
  logo,
  showLogo 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={{ 
      background: backgroundColor || '#007bff', 
      padding: '15px 20px', 
      color: textColor || 'white',
      borderRadius: '8px',
      position: 'relative'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Brand/Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {showLogo && logo && (
            <img 
              src={logo} 
              alt="Logo" 
              style={{ height: '30px' }} 
            />
          )}
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            {brand || 'My Store'}
          </span>
        </div>

        {/* Desktop Menu */}
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }} className="desktop-menu">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href="#" 
              style={{ 
                color: textColor || 'white', 
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: textColor || 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '5px'
          }}
          className="mobile-menu-button"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          background: backgroundColor || '#007bff',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000
        }} className="mobile-menu">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href="#" 
              style={{ 
                display: 'block',
                color: textColor || 'white', 
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                padding: '15px 20px',
                borderBottom: index < menuItems.length - 1 ? `1px solid ${textColor || 'white'}33` : 'none',
                transition: 'background-color 0.2s'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation; 