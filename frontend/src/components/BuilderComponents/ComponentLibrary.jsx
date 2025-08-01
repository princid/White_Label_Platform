import React, { useState } from 'react';

const ComponentLibrary = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const components = [
        {
            name: "Header",
            description: "Customizable header section",
            icon: "📄",
            component: "Header",
            defaultProps: {
                title: "Welcome",
                subtitle: "Custom header content",
                backgroundColor: "#f8f9fa",
                textColor: "#333",
                logo: "",
                showLogo: false,
            },
            variants: [
                {
                    name: "Simple Header",
                    description: "Clean and minimal header",
                    props: {
                        title: "Welcome",
                        subtitle: "Simple and clean",
                        backgroundColor: "#ffffff",
                        textColor: "#333333",
                        showLogo: false,
                    },
                },
                {
                    name: "Logo Header",
                    description: "Header with company logo",
                    props: {
                        title: "Your Company",
                        subtitle: "Tagline here",
                        backgroundColor: "#f8f9fa",
                        textColor: "#333333",
                        showLogo: true,
                        logo: "https://via.placeholder.com/120x40",
                    },
                },
                {
                    name: "Dark Header",
                    description: "Dark themed header",
                    props: {
                        title: "Welcome",
                        subtitle: "Professional dark theme",
                        backgroundColor: "#343a40",
                        textColor: "#ffffff",
                        showLogo: false,
                    },
                },
            ],
        },
        {
            name: "Navigation",
            description: "Menu navigation bar",
            icon: "🧭",
            component: "Navigation",
            defaultProps: {
                brand: "My Store",
                menuItems: ["Home", "Products", "Contact"],
                backgroundColor: "#007bff",
                textColor: "white",
                logo: "",
                showLogo: false,
            },
            variants: [
                {
                    name: "Standard Navigation",
                    description: "Classic navigation bar",
                    props: {
                        brand: "My Store",
                        menuItems: ["Home", "Products", "About", "Contact"],
                        backgroundColor: "#007bff",
                        textColor: "white",
                        showLogo: false,
                    },
                },
                {
                    name: "Brand Navigation",
                    description: "Navigation with logo",
                    props: {
                        brand: "Your Brand",
                        menuItems: ["Home", "Shop", "Services", "Contact"],
                        backgroundColor: "#ffffff",
                        textColor: "#333333",
                        showLogo: true,
                        logo: "https://via.placeholder.com/100x30",
                    },
                },
                {
                    name: "Dark Navigation",
                    description: "Dark themed navigation",
                    props: {
                        brand: "Store",
                        menuItems: ["Home", "Products", "Blog", "Contact"],
                        backgroundColor: "#212529",
                        textColor: "white",
                        showLogo: false,
                    },
                },
            ],
        },
        {
            name: "Hero",
            description: "Hero banner section",
            icon: "🎯",
            component: "Hero",
            defaultProps: {
                title: "Welcome to Our Store",
                subtitle: "Discover amazing products",
                buttonText: "Shop Now",
                buttonLink: "",
                backgroundImage: "",
                backgroundColor: "",
                textColor: "white",
                buttonColor: "white",
                buttonTextColor: "#667eea",
                height: 300,
                showButton: true,
            },
            variants: [
                {
                    name: "Image Hero",
                    description: "Hero with background image",
                    props: {
                        title: "Welcome to Our Store",
                        subtitle: "Discover amazing products",
                        buttonText: "Shop Now",
                        backgroundImage:
                            "https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        backgroundColor: "",
                        textColor: "white",
                        buttonColor: "#007bff",
                        buttonTextColor: "white",
                        height: 400,
                        showButton: true,
                    },
                },
                {
                    name: "Gradient Hero",
                    description: "Hero with gradient background",
                    props: {
                        title: "Modern Store Experience",
                        subtitle: "Shop the latest trends",
                        buttonText: "Explore",
                        backgroundImage: "",
                        backgroundColor:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        textColor: "white",
                        buttonColor: "white",
                        buttonTextColor: "#667eea",
                        height: 350,
                        showButton: true,
                    },
                },
                {
                    name: "Minimal Hero",
                    description: "Clean and minimal hero",
                    props: {
                        title: "Simple Excellence",
                        subtitle: "Quality products, simple shopping",
                        buttonText: "Get Started",
                        backgroundImage: "",
                        backgroundColor: "#f8f9fa",
                        textColor: "#333333",
                        buttonColor: "#28a745",
                        buttonTextColor: "white",
                        height: 250,
                        showButton: true,
                    },
                },
            ],
        },
        {
            name: "ProductGrid",
            description: "Product display grid",
            icon: "📦",
            component: "ProductGrid",
            defaultProps: {
                title: "Our Products",
                products: [],
                columns: 4,
                backgroundColor: "transparent",
                textColor: "#333",
                cardBackgroundColor: "white",
                showTitle: true,
                showPrice: true,
                showDescription: true,
                showButton: true,
            },
            variants: [
                {
                    name: "4-Column Grid",
                    description: "Standard 4-column layout",
                    props: {
                        title: "Our Products",
                        products: [],
                        columns: 4,
                        backgroundColor: "transparent",
                        textColor: "#333333",
                        cardBackgroundColor: "white",
                        showTitle: true,
                        showPrice: true,
                        showDescription: true,
                        showButton: true,
                    },
                },
                {
                    name: "3-Column Grid",
                    description: "Wider cards with 3 columns",
                    props: {
                        title: "Featured Products",
                        products: [],
                        columns: 3,
                        backgroundColor: "#f8f9fa",
                        textColor: "#333333",
                        cardBackgroundColor: "white",
                        showTitle: true,
                        showPrice: true,
                        showDescription: true,
                        showButton: true,
                    },
                },
                {
                    name: "Compact Grid",
                    description: "Minimal product cards",
                    props: {
                        title: "Quick Shop",
                        products: [],
                        columns: 5,
                        backgroundColor: "transparent",
                        textColor: "#333333",
                        cardBackgroundColor: "white",
                        showTitle: true,
                        showPrice: true,
                        showDescription: false,
                        showButton: false,
                    },
                },
            ],
        },
        {
            name: "Footer",
            description: "Footer section",
            icon: "📋",
            component: "Footer",
            defaultProps: {
                companyName: "Your Store",
                email: "info@store.com",
                phone: "",
                address: "",
                backgroundColor: "#333",
                textColor: "white",
                links: [],
                socialLinks: [],
                showLogo: false,
                logo: "",
            },
            variants: [
                {
                    name: "Simple Footer",
                    description: "Basic footer with contact info",
                    props: {
                        companyName: "Your Store",
                        email: "info@store.com",
                        phone: "+1 (555) 123-4567",
                        address: "",
                        backgroundColor: "#333333",
                        textColor: "white",
                        links: [],
                        socialLinks: [],
                        showLogo: false,
                        logo: "",
                    },
                },
                {
                    name: "Detailed Footer",
                    description: "Footer with links and social media",
                    props: {
                        companyName: "Your Store",
                        email: "contact@store.com",
                        phone: "+1 (555) 123-4567",
                        address: "123 Store Street, City, State 12345",
                        backgroundColor: "#212529",
                        textColor: "white",
                        links: [
                            { title: 'Company', url: '#', items: ['About Us', 'Careers', 'Press'] },
                            { title: 'Legal', url: '#', items: ['Privacy Policy', 'Terms of Service', 'Return Policy'] },
                            { title: 'Support', url: '#', items: ['Help Center', 'Contact Us', 'FAQ'] }
                        ],
                        socialLinks: [
                            { name: 'Facebook', url: '#', icon: '📘' },
                            { name: 'Twitter', url: '#', icon: '🐦' },
                            { name: 'Instagram', url: '#', icon: '📷' }
                        ],
                        showLogo: true,
                        logo: "https://via.placeholder.com/120x40",
                    },
                },
                {
                    name: "Light Footer",
                    description: "Light themed footer",
                    props: {
                        companyName: "Your Store",
                        email: "hello@store.com",
                        phone: "",
                        address: "",
                        backgroundColor: "#f8f9fa",
                        textColor: "#333333",
                        links: [
                            { title: 'Quick Links', url: '#', items: ['About', 'Contact', 'Support'] }
                        ],
                        socialLinks: [],
                        showLogo: false,
                        logo: "",
                    },
                },
            ],
        },
    ];

    const handleDragStart = (e, component, variant = null) => {
        const dragData = {
            component: component.component,
            props: variant ? variant.props : component.defaultProps
        };

        console.log('Drag start with data:', dragData);

        e.dataTransfer.setData('application/json', JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'copy';

        // Also set as text for debugging
        e.dataTransfer.setData('text/plain', JSON.stringify(dragData));
    };

    const toggleDropdown = (e, componentIndex) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === componentIndex ? null : componentIndex);
    };

    const handleVariantSelect = (e, component, variant) => {
        e.stopPropagation();
        setActiveDropdown(null);

        // Create a synthetic drag event for the variant
        const dragData = {
            component: component.component,
            props: variant.props
        };

        console.log('Variant selected:', variant.name, dragData);
        // You can trigger the same drag functionality or handle it differently
        // For now, we'll just log it - you can extend this to directly add to preview
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="w-100">
            <h6 className="mb-3">Available Components:</h6>
            <div className="d-flex flex-column gap-2">
                {components.map((component, index) => (
                    <div key={index} className="position-relative">
                        <div
                            className="component-item p-3 border rounded"
                            style={{
                                fontSize: '14px',
                                cursor: 'grab',
                                transition: 'all 0.2s ease'
                            }}
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, component)}
                            onDragEnd={(e) => {
                                e.target.style.opacity = '1';
                                e.target.style.transform = 'scale(1)';
                            }}
                            onDragEnter={(e) => {
                                e.target.style.opacity = '0.7';
                                e.target.style.transform = 'scale(0.95)';
                            }}
                            onDragLeave={(e) => {
                                e.target.style.opacity = '1';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <span style={{ fontSize: '18px' }}>{component.icon}</span>
                                <div className="flex-grow-1">
                                    <strong>{component.name}</strong>
                                    <div className="text-muted small">{component.description}</div>
                                </div>

                                {/* Three dots menu */}
                                <button
                                    className="btn btn-sm component-library-menu-btn p-1 me-2"
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: 'none',
                                        background: 'transparent'
                                    }}
                                    onClick={(e) => toggleDropdown(e, index)}
                                    title="More options"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="5" r="2"/>
                                        <circle cx="12" cy="12" r="2"/>
                                        <circle cx="12" cy="19" r="2"/>
                                    </svg>
                                </button>

                                <div className="drag-handle" style={{ pointerEvents: 'none' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown menu */}
                        {activeDropdown === index && (
                            <div
                                className="position-absolute bg-white border rounded shadow-sm p-2 component-variants-dropdown"
                                style={{
                                    top: '100%',
                                    right: '0',
                                    zIndex: 1000,
                                    minWidth: '200px',
                                    maxWidth: '250px'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="fw-bold text-muted small mb-2 px-2">Component Variants:</div>
                                {component.variants?.map((variant, variantIndex) => (
                                    <div
                                        key={variantIndex}
                                        className="p-2 rounded variant-item"
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={(e) => handleVariantSelect(e, component, variant)}
                                        draggable={true}
                                        onDragStart={(e) => handleDragStart(e, component, variant)}
                                    >
                                        <div className="fw-bold small">{variant.name}</div>
                                        <div className="text-muted" style={{ fontSize: '12px' }}>
                                            {variant.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComponentLibrary; 