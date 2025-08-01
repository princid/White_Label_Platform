import { saveStorefrontSettings, getStorefrontSettings } from './api';
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './App.css';

const headerTemplates = [
    { id: 'simple', label: 'Simple Header', content: <header className="header-simple">Simple Header</header> },
    { id: 'logo', label: 'Header with Logo', content: <header className="header-logo"><img src="/vite.svg" alt="Logo" height={32} /> Logo Header</header> },
];
const footerTemplates = [
    { id: 'simple', label: 'Simple Footer', content: <footer className="footer-simple">Simple Footer</footer> },
    { id: 'links', label: 'Footer with Links', content: <footer className="footer-links">Footer | <a href="#">Link 1</a> | <a href="#">Link 2</a></footer> },
];
const navbarTemplates = [
    { id: 'basic', label: 'Basic Navbar', content: <nav className="navbar-basic"><a href='#'> Home </a> | <a href="#">Products</a> | Contact</nav> },
    { id: 'modern', label: 'Modern Navbar', content: <nav className="navbar-modern"><span>🏪</span> <span>Shop</span></nav> },
];
const sidebarTemplates = [
    { id: 'none', label: 'No Sidebar', content: null },
    {
        id: 'left',
        label: 'Left Sidebar',
        content: (
            <aside className="sidebar-left" style={{
                width: 280,
                background: '#f8fafc',
                borderRight: '1px solid #e2e8f0',
                padding: '20px 16px',
                height: '100%',
                overflowY: 'auto'
            }}>
                <div style={{ marginBottom: 24 }}>
                    <h4 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 12 }}>Categories</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <a href="#" style={{ padding: '8px 12px', borderRadius: 8, color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'all 0.2s' }}>All Products</a>
                        <a href="#" style={{ padding: '8px 12px', borderRadius: 8, color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'all 0.2s' }}>Footwear</a>
                        <a href="#" style={{ padding: '8px 12px', borderRadius: 8, color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'all 0.2s' }}>Bags & Accessories</a>
                        <a href="#" style={{ padding: '8px 12px', borderRadius: 8, color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'all 0.2s' }}>Electronics</a>
                        <a href="#" style={{ padding: '8px 12px', borderRadius: 8, color: '#64748b', textDecoration: 'none', fontSize: 14, transition: 'all 0.2s' }}>Clothing</a>
                    </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <h4 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 12 }}>Price Range</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
                            <input type="checkbox" style={{ margin: 0 }} />
                            Under $50
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
                            <input type="checkbox" style={{ margin: 0 }} />
                            $50 - $100
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
                            <input type="checkbox" style={{ margin: 0 }} />
                            $100 - $200
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
                            <input type="checkbox" style={{ margin: 0 }} />
                            Over $200
                        </label>
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 12,
                    padding: 16,
                    color: 'white',
                    marginBottom: 16
                }}>
                    <h5 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Special Offer</h5>
                    <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>Get 20% off on your first purchase!</p>
                </div>
            </aside>
        )
    },
    {
        id: 'modern',
        label: 'Modern Sidebar',
        content: (
            <aside className="sidebar-modern" style={{
                width: 300,
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                borderRight: '1px solid #e2e8f0',
                padding: '24px 20px',
                height: '100%',
                overflowY: 'auto',
                boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
            }}>
                <div style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 32, height: 32, background: '#3b82f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'white', fontSize: 16 }}>🏪</span>
                        </div>
                        <h4 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', margin: 0 }}>Shop</h4>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <a href="#" style={{
                            padding: '12px 16px',
                            borderRadius: 10,
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: 15,
                            fontWeight: 500,
                            background: '#eff6ff',
                            border: '1px solid #dbeafe'
                        }}>🏠 Home</a>
                        <a href="#" style={{
                            padding: '12px 16px',
                            borderRadius: 10,
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: 15,
                            transition: 'all 0.2s'
                        }}>👟 Footwear</a>
                        <a href="#" style={{
                            padding: '12px 16px',
                            borderRadius: 10,
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: 15,
                            transition: 'all 0.2s'
                        }}>👜 Bags</a>
                        <a href="#" style={{
                            padding: '12px 16px',
                            borderRadius: 10,
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: 15,
                            transition: 'all 0.2s'
                        }}>📱 Electronics</a>
                        <a href="#" style={{
                            padding: '12px 16px',
                            borderRadius: 10,
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: 15,
                            transition: 'all 0.2s'
                        }}>👕 Clothing</a>
                    </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                    <h5 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>Quick Filters</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <span style={{
                            padding: '6px 12px',
                            background: '#f1f5f9',
                            borderRadius: 20,
                            fontSize: 13,
                            color: '#64748b',
                            cursor: 'pointer'
                        }}>New Arrivals</span>
                        <span style={{
                            padding: '6px 12px',
                            background: '#f1f5f9',
                            borderRadius: 20,
                            fontSize: 13,
                            color: '#64748b',
                            cursor: 'pointer'
                        }}>On Sale</span>
                        <span style={{
                            padding: '6px 12px',
                            background: '#f1f5f9',
                            borderRadius: 20,
                            fontSize: 13,
                            color: '#64748b',
                            cursor: 'pointer'
                        }}>Best Sellers</span>
                        <span style={{
                            padding: '6px 12px',
                            background: '#f1f5f9',
                            borderRadius: 20,
                            fontSize: 13,
                            color: '#64748b',
                            cursor: 'pointer'
                        }}>Trending</span>
                    </div>
                </div>

                <div style={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: 16,
                    padding: 20,
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>
                    <h5 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Flash Sale!</h5>
                    <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>Up to 50% off selected items</p>
                    <button style={{
                        marginTop: 12,
                        padding: '8px 16px',
                        background: 'rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: 8,
                        color: 'white',
                        fontSize: 14,
                        cursor: 'pointer'
                    }}>Shop Now</button>
                </div>
            </aside>
        )
    },
    {
        id: 'minimal',
        label: 'Minimal Sidebar',
        content: (
            <aside className="sidebar-minimal" style={{
                width: 240,
                background: '#ffffff',
                borderRight: '1px solid #f1f5f9',
                padding: '20px 16px',
                height: '100%',
                overflowY: 'auto'
            }}>
                <div style={{ marginBottom: 32 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</h4>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <a href="#" style={{
                            padding: '10px 12px',
                            color: '#374151',
                            textDecoration: 'none',
                            fontSize: 14,
                            borderLeft: '3px solid #3b82f6',
                            background: '#f8fafc'
                        }}>All Products</a>
                        <a href="#" style={{
                            padding: '10px 12px',
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: 14,
                            borderLeft: '3px solid transparent'
                        }}>Footwear</a>
                        <a href="#" style={{
                            padding: '10px 12px',
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: 14,
                            borderLeft: '3px solid transparent'
                        }}>Accessories</a>
                        <a href="#" style={{
                            padding: '10px 12px',
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: 14,
                            borderLeft: '3px solid transparent'
                        }}>Electronics</a>
                        <a href="#" style={{
                            padding: '10px 12px',
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: 14,
                            borderLeft: '3px solid transparent'
                        }}>Clothing</a>
                    </nav>
                </div>

                <div style={{ marginBottom: 32 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#6b7280' }}>
                            <input type="radio" name="price" style={{ margin: 0 }} />
                            Under $50
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#6b7280' }}>
                            <input type="radio" name="price" style={{ margin: 0 }} />
                            $50 - $100
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#6b7280' }}>
                            <input type="radio" name="price" style={{ margin: 0 }} />
                            $100 - $200
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#6b7280' }}>
                            <input type="radio" name="price" style={{ margin: 0 }} />
                            Over $200
                        </label>
                    </div>
                </div>

                <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: 16,
                    background: '#fafafa'
                }}>
                    <h5 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Newsletter</h5>
                    <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12, lineHeight: 1.4 }}>Get updates on new products and special offers.</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: 4,
                            fontSize: 13,
                            marginBottom: 8
                        }}
                    />
                    <button style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#374151',
                        border: 'none',
                        borderRadius: 4,
                        color: 'white',
                        fontSize: 13,
                        cursor: 'pointer'
                    }}>Subscribe</button>
                </div>
            </aside>
        )
    }
];
const heroTemplates = [
    {
        id: 'image',
        label: 'Image Hero',
        content: (
            <section className="hero-image position-relative mb-4" style={{ borderRadius: 18, overflow: 'hidden', minHeight: 180, background: '#f8fafc', boxShadow: '0 2px 12px #0001', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src="https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Hero"
                    style={{ width: '100%', height: 220, objectFit: 'cover', filter: 'brightness(0.85)', borderRadius: 18 }}
                />
                <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', background: 'rgba(0,0,0,0.25)' }}>
                    <h2 style={{ fontSize: 32, fontWeight: 800, textShadow: '0 2px 8px #0006', marginBottom: 8 }}>Welcome to Your Storefront</h2>
                    <p style={{ fontSize: 18, fontWeight: 500, textShadow: '0 1px 4px #0005', margin: 0 }}>Discover amazing products and deals!</p>
                </div>
            </section>
        ),
    },
    {
        id: 'text',
        label: 'Text Hero',
        content: (
            <section className="hero-text d-flex flex-column align-items-center justify-content-center mb-4" style={{ borderRadius: 18, minHeight: 160, background: 'linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%)', boxShadow: '0 2px 12px #0001', padding: '32px 16px' }}>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Big Sale!</h2>
                <p style={{ fontSize: 18, color: '#334155', fontWeight: 500, margin: 0 }}>Shop the best products now.</p>
            </section>
        ),
    },
];
const cardTemplates = [
    { id: 'simple', label: 'Simple Card', content: <div className="card-simple"><h3>Product</h3><p>Description</p></div> },
    { id: 'image', label: 'Card with Image', content: <div className="card-image"><img src="/vite.svg" alt="Card" height={40} /><h3>Product</h3></div> },
];
const sampleProducts = [
    {
        id: 1,
        name: 'Classic Sneakers',
        description: 'Comfortable and stylish everyday sneakers.',
        price: 59.99,
        image: 'https://www.lo10m.com/cdn/shop/products/air-jordan-1-low-reverse-black-toe-w-lo10m-10_1500x.jpg?v=1716820975',
    },
    {
        id: 2,
        name: 'Leather Backpack',
        description: 'Premium leather backpack for work or travel.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 3,
        name: 'Smart Watch',
        description: 'Track your fitness and notifications in style.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 4,
        name: 'Wireless Earbuds',
        description: 'High quality sound with noise cancellation.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 5,
        name: 'Wireless Earbuds',
        description: 'High quality sound with noise cancellation.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 6,
        name: 'Wireless Earbuds',
        description: 'High quality sound with noise cancellation.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 7,
        name: 'Wireless Earbuds',
        description: 'High quality sound with noise cancellation.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 8,
        name: 'Wireless Earbuds',
        description: 'High quality sound with noise cancellation.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 9,
        name: 'Wireless Earbuds',
        description: 'High quality sound with noise cancellation.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    },
];

export default function CreateStorefront() {
    // Section order state for drag-and-drop
    const [sectionOrder, setSectionOrder] = useState([
        { id: 'header', label: 'Header', value: headerTemplates[0].id },
        { id: 'navbar', label: 'Navbar', value: navbarTemplates[0].id },
        { id: 'sidebar', label: 'Sidebar', value: sidebarTemplates[0].id },
        { id: 'hero', label: 'Hero Section', value: heroTemplates[0].id },
        { id: 'card', label: 'Product Card', value: cardTemplates[0].id },
        { id: 'footer', label: 'Footer', value: footerTemplates[0].id },
    ]);
    const [saved, setSaved] = useState(false);
    const [device, setDevice] = useState('desktop');
    const [products, setProducts] = useState(sampleProducts);
    const [loading, setLoading] = useState(true);

    // Helper to get/set values by section id
    const getSectionValue = (id) => sectionOrder.find(s => s.id === id)?.value;
    const setSectionValue = (id, value) => {
        setSectionOrder(order => order.map(s => s.id === id ? { ...s, value } : s));
    };

    useEffect(() => {
        let tenantId = localStorage.getItem('tenantId');
        getStorefrontSettings(tenantId)
            .then(data => {
                if (data) {
                    setSectionOrder(order => order.map(s => {
                        let val = data[s.id];
                        if (val) {
                            // Validate value exists in template
                            let valid = false;
                            if (s.id === 'header') valid = headerTemplates.some(t => t.id === val);
                            if (s.id === 'footer') valid = footerTemplates.some(t => t.id === val);
                            if (s.id === 'navbar') valid = navbarTemplates.some(t => t.id === val);
                            if (s.id === 'sidebar') valid = sidebarTemplates.some(t => t.id === val);
                            if (s.id === 'hero') valid = heroTemplates.some(t => t.id === val);
                            if (s.id === 'card') valid = cardTemplates.some(t => t.id === val);
                            if (valid) return { ...s, value: val };
                        }
                        return s;
                    }));
                    if (Array.isArray(data.products) && data.products.length > 0) {
                        setProducts(data.products);
                    } else {
                        setProducts(sampleProducts);
                    }
                } else {
                    setProducts(sampleProducts);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDeviceToggle = (selectedDevice) => {
        setDevice(selectedDevice);
    };

    async function handleSave() {
        // Save order and values
        const design = Object.fromEntries(sectionOrder.map(s => [s.id, s.value]));
        design.products = products;
        let tenantId = localStorage.getItem('tenantId');
        try {
            await saveStorefrontSettings(tenantId, design);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            alert('Failed to save storefront settings.');
        }
    }

    // Drag-and-drop sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    // Move handleSidebarDragEnd here so it has access to sectionOrder
    const handleSidebarDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = sectionOrder.findIndex(s => s.id === active.id);
            const newIndex = sectionOrder.findIndex(s => s.id === over.id);
            setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
        }
    };

    // Move SortableSidebarSection here so it has access to setSectionValue and sectionOrder
    function SortableSidebarSection({ section, templates }) {
        const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.6 : 1,
            background: isDragging ? '#f3f4f6' : 'transparent',
            borderRadius: 8,
            marginBottom: 8,
        };
        return (
            <div ref={setNodeRef} style={style} className="w-100 d-flex align-items-center gap-2 px-1">
                {/* Drag handle - only this is draggable */}
                <div
                    {...attributes}
                    {...listeners}
                    style={{
                        cursor: 'grab',
                        padding: '8px 6px',
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        minWidth: 32,
                        height: 32
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f1f5f9';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ opacity: 0.6 }}
                    >
                        <path
                            d="M8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z"
                            fill="currentColor"
                        />
                        <path
                            d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z"
                            fill="currentColor"
                        />
                        <path
                            d="M8 18C8 19.1046 7.10457 20 6 20C4.89543 20 4 19.1046 4 18C4 16.8954 4.89543 16 6 16C7.10457 16 8 16.8954 8 18Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"
                            fill="currentColor"
                        />
                        <path
                            d="M20 6C20 7.10457 19.1046 8 18 8C16.8954 8 16 7.10457 16 6C16 4.89543 16.8954 4 18 4C19.1046 4 20 4.89543 20 6Z"
                            fill="currentColor"
                        />
                        <path
                            d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z"
                            fill="currentColor"
                        />
                        <path
                            d="M20 18C20 19.1046 19.1046 20 18 20C16.8954 20 16 19.1046 16 18C16 16.8954 16.8954 16 18 16C19.1046 16 20 16.8954 20 18Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>

                {/* Content area - not draggable, remains interactive */}
                <div className="flex-grow-1">
                    <label className="form-label mb-1">{section.label}</label>
                    <select className="form-select" value={section.value} onChange={e => setSectionValue(section.id, e.target.value)}>
                        {templates.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                </div>
            </div>
        );
    }

    // Map section id to templates
    const sectionTemplates = {
        header: headerTemplates,
        navbar: navbarTemplates,
        sidebar: sidebarTemplates,
        hero: heroTemplates,
        card: cardTemplates,
        footer: footerTemplates,
    };

    // Map section id to preview content
    const getSectionContent = (section) => {
        if (section.id === 'header') return headerTemplates.find(t => t.id === section.value)?.content;
        if (section.id === 'navbar') return navbarTemplates.find(t => t.id === section.value)?.content;
        if (section.id === 'sidebar') return sidebarTemplates.find(t => t.id === section.value)?.content;
        if (section.id === 'hero') return heroTemplates.find(t => t.id === section.value)?.content;
        if (section.id === 'footer') return footerTemplates.find(t => t.id === section.value)?.content;
        return null;
    };

    // Product card preview
    const getProductCard = (product, sectionOrder, key) => {
        const cardType = sectionOrder.find(s => s.id === 'card')?.value;
        if (cardType === 'image') {
            return (
                <div key={key} className={`card-preview image`} style={{ minWidth: 220, maxWidth: 260, flex: '1 1 220px', background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
                    <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px 0' }}>{product.name}</h3>
                    <p style={{ fontSize: 14, color: '#555', margin: 0, flex: 1 }}>{product.description}</p>
                    <div style={{ fontWeight: 700, color: '#0d6efd', marginTop: 12, fontSize: 16 }}>${product.price.toFixed(2)}</div>
                    <button className="btn btn-outline-primary btn-sm mt-3" style={{ borderRadius: 8 }}>View Product</button>
                </div>
            );
        }
        // simple card
        return (
            <div key={key} className={`card-preview simple`} style={{ minWidth: 220, maxWidth: 260, flex: '1 1 220px', background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px 0' }}>{product.name}</h3>
                <p style={{ fontSize: 14, color: '#555', margin: 0, flex: 1 }}>{product.description}</p>
                <div style={{ fontWeight: 700, color: '#0d6efd', marginTop: 12, fontSize: 16 }}>${product.price.toFixed(2)}</div>
                <button className="btn btn-outline-primary btn-sm mt-3" style={{ borderRadius: 8 }}>View Product</button>
            </div>
        );
    };

    // Render preview content based on sectionOrder
    const renderPreviewContent = () => {
        // Simple approach: render sections in order with proper layout
        const topSections = [];
        const mainSections = [];
        const bottomSections = [];
        
        // Categorize sections by their natural layout position
        sectionOrder.forEach(section => {
            if (section.id === 'header' || section.id === 'navbar') {
                topSections.push(section);
            } else if (section.id === 'footer') {
                bottomSections.push(section);
            } else if (section.id === 'hero' || section.id === 'sidebar') {
                mainSections.push(section);
            }
            // card section is handled separately
        });

        return (
            <>
                {/* Top sections */}
                {topSections.map(section => (
                    <React.Fragment key={section.id}>
                        {getSectionContent(section)}
                    </React.Fragment>
                ))}
                
                {/* Single main content area */}
                <div className="main-content d-flex flex-grow-1 min-vh-0" style={{ minHeight: 0 }}>
                    {/* Sidebar if present */}
                    {mainSections.find(s => s.id === 'sidebar') && 
                        getSectionContent(mainSections.find(s => s.id === 'sidebar'))}
                    
                    {/* Content area */}
                    <div className="content-area flex-grow-1 p-3 overflow-auto" style={{ minHeight: 0, maxHeight: '100%', overflowY: 'auto' }}>
                        {/* Hero if present */}
                        {mainSections.find(s => s.id === 'hero') && 
                            getSectionContent(mainSections.find(s => s.id === 'hero'))}
                        
                        {/* Product cards - only once */}
                        <div className="product-list-preview d-flex flex-row flex-wrap gap-3 justify-content-start align-items-stretch mt-3">
                            {products.map(product => getProductCard(product, sectionOrder, product.id))}
                        </div>
                    </div>
                </div>
                
                {/* Bottom sections */}
                {bottomSections.map(section => (
                    <React.Fragment key={section.id}>
                        {getSectionContent(section)}
                    </React.Fragment>
                ))}
            </>
        );
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center min-vh-100"><span>Loading storefront...</span></div>;
    }

    return (
        <div className="storefront-pro flex-row d-flex min-vh-100 bg-body-tertiary">
            {/* Sidebar with drag-and-drop */}
            <aside className="storefront-sidebar-pro d-flex flex-column align-items-center py-4 px-3 shadow-sm bg-white" style={{ width: 500, minWidth: 220, minHeight: '100vh', borderRight: '1px solid #eee' }}>
                <div className="mb-4 w-100 d-flex align-items-center justify-content-center gap-2">
                    <img src="/vite.svg" alt="Logo" height={32} />
                    <span className="fs-5 fw-bold text-primary">Storefront Builder</span>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSidebarDragEnd}>
                    <SortableContext items={sectionOrder.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        <div className="w-100">
                            {sectionOrder.map(section => (
                                <SortableSidebarSection key={section.id} section={section} templates={sectionTemplates[section.id]} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
                <button className="btn btn-primary w-100 mt-2" onClick={handleSave}>Save Settings</button>
                {saved && <div className="alert alert-success mt-3 py-2 text-center w-100">Settings saved!</div>}
            </aside>
            {/* Live Preview (order and values from sectionOrder) */}
            <main className="flex-grow-1 p-4 bg-body-tertiary">
                <div className="w-100 d-flex align-items-center justify-content-between mb-4">
                    <h2 className="fw-bold mb-0">Live Preview</h2>
                    <div className="device-frame-options d-flex gap-2">
                        <button className={device === 'desktop' ? 'primary-btn' : 'secondary-btn'} onClick={() => handleDeviceToggle('desktop')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-window-desktop" viewBox="0 0 16 16">
                                <path d="M3.5 11a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                <path d="M2.375 1A2.366 2.366 0 0 0 0 3.357v9.286A2.366 2.366 0 0 0 2.375 15h11.25A2.366 2.366 0 0 0 16 12.643V3.357A2.366 2.366 0 0 0 13.625 1zM1 3.357C1 2.612 1.611 2 2.375 2h11.25C14.389 2 15 2.612 15 3.357V4H1zM1 5h14v7.643c0 .745-.611 1.357-1.375 1.357H2.375A1.366 1.366 0 0 1 1 12.643z" />
                            </svg>
                        </button>
                        <button className={device === 'mobile' ? 'primary-btn' : 'secondary-btn'} onClick={() => handleDeviceToggle('mobile')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center" style={{ minHeight: 600 }}>
                    <div className={`device-frame-${device} d-flex flex-column align-items-stretch justify-content-start`}>
                        {/* Simulated browser bar */}
                        <div style={{ height: 32, background: '#f1f3f7', borderBottom: '1px solid #e3e6ea', borderTopLeftRadius: 30, borderTopRightRadius: 30, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e57373', display: 'inline-block' }}></span>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffb74d', display: 'inline-block' }}></span>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#81c784', display: 'inline-block' }}></span>
                            <span className="ms-3 text-muted small" style={{ fontWeight: 500 }}>storefront.local</span>
                        </div>
                        {/* Preview content (ordered by sectionOrder) */}
                        <div className="storefront-preview-pro flex-grow-1 w-100 d-flex flex-column" style={{ padding: 0, background: 'transparent', minHeight: 0, overflow: 'hidden' }}>
                            {renderPreviewContent()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

