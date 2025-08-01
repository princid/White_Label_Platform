import React, { useState, useEffect } from 'react';

const Footer = ({ 
  companyName, 
  email, 
  phone,
  address,
  backgroundColor,
  textColor,
  links = [],
  socialLinks = [],
  showLogo = false,
  logo
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const defaultLinks = [
    { title: 'About Us', url: '#', items: ['Our Story', 'Team', 'Careers'] },
    { title: 'Products', url: '#', items: ['All Products', 'Categories', 'New Arrivals'] },
    { title: 'Support', url: '#', items: ['Contact', 'FAQ', 'Help Center'] }
  ];

  const defaultSocialLinks = [
    { name: 'Facebook', url: '#', icon: '📘' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'LinkedIn', url: '#', icon: '💼' }
  ];

  const displayLinks = links.length > 0 ? links : defaultLinks;
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <footer 
      className="footer-component"
      style={{ 
        background: backgroundColor || '#333', 
        color: textColor || 'white', 
        padding: isMobile ? '30px 15px' : '40px 20px', 
        marginTop: '40px',
        borderRadius: '12px 12px 0 0'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div 
          className="footer-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile 
              ? '1fr' 
              : 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: isMobile ? '20px' : '30px',
            marginBottom: '30px'
          }}
        >
          {/* Company Info */}
          <div>
            {showLogo && logo && (
              <img 
                src={logo} 
                alt="Logo" 
                style={{ height: '40px', marginBottom: '15px' }} 
              />
            )}
            <h4 style={{ 
              marginBottom: '15px', 
              fontSize: isMobile ? '1.1rem' : '1.3rem' 
            }}>
              {companyName || 'Your Store'}
            </h4>
            <p style={{ marginBottom: '10px', opacity: 0.9, lineHeight: '1.6' }}>
              Your trusted partner for quality products and exceptional service.
            </p>
            {email && (
              <p style={{ marginBottom: '5px', opacity: 0.9 }}>
                Email: {email}
              </p>
            )}
            {phone && (
              <p style={{ marginBottom: '5px', opacity: 0.9 }}>
                Phone: {phone}
              </p>
            )}
            {address && (
              <p style={{ opacity: 0.9 }}>
                Address: {address}
              </p>
            )}
          </div>

          {/* Quick Links */}
          {displayLinks.map((section, index) => (
            <div key={index}>
              <h4 style={{ 
                marginBottom: '15px', 
                fontSize: isMobile ? '1.1rem' : '1.3rem' 
              }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} style={{ marginBottom: '8px' }}>
                    <a 
                      href={section.url} 
                      style={{ 
                        color: textColor || 'white', 
                        textDecoration: 'none',
                        opacity: 0.9,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '1'}
                      onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div style={{ 
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h5 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
            Follow Us
          </h5>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            {displaySocialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                style={{
                  display: 'flex',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{ 
          paddingTop: '20px', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          opacity: 0.8
        }}>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} {companyName || 'Your Store'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
