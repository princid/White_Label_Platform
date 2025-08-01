import React, { useState, useEffect } from 'react';
import { BuilderComponent, Builder } from '@builder.io/react';
import { saveStorefrontSettings, getStorefrontSettings } from './api';
import Header from './components/BuilderComponents/Header';
import Navigation from './components/BuilderComponents/Navigation';
import Hero from './components/BuilderComponents/Hero';
import ProductGrid from './components/BuilderComponents/ProductGrid';
import Footer from './components/BuilderComponents/Footer';
import BuilderSidebar from './components/BuilderComponents/BuilderSidebar';
import PreviewArea from './components/BuilderComponents/PreviewArea';
import './App.css';

// Register components with Builder.io for edit mode
Builder.registerComponent(Header, {
    name: 'Header',
    inputs: [
        { name: 'title', type: 'text', defaultValue: 'Welcome' },
        { name: 'subtitle', type: 'text', defaultValue: 'Custom header content' },
        { name: 'backgroundColor', type: 'color', defaultValue: '#f8f9fa' },
        { name: 'textColor', type: 'color', defaultValue: '#333' },
        { name: 'logo', type: 'url', defaultValue: '' },
        { name: 'showLogo', type: 'boolean', defaultValue: false }
    ]
});

Builder.registerComponent(Navigation, {
    name: 'Navigation',
    inputs: [
        { name: 'brand', type: 'text', defaultValue: 'My Store' },
        { name: 'menuItems', type: 'list', defaultValue: ['Home', 'Products', 'Contact'] },
        { name: 'backgroundColor', type: 'color', defaultValue: '#007bff' },
        { name: 'textColor', type: 'color', defaultValue: 'white' },
        { name: 'logo', type: 'url', defaultValue: '' },
        { name: 'showLogo', type: 'boolean', defaultValue: false }
    ]
});

Builder.registerComponent(Hero, {
    name: 'Hero',
    inputs: [
        { name: 'title', type: 'text', defaultValue: 'Welcome to Our Store' },
        { name: 'subtitle', type: 'text', defaultValue: 'Discover amazing products' },
        { name: 'buttonText', type: 'text', defaultValue: 'Shop Now' },
        { name: 'buttonLink', type: 'url', defaultValue: '' },
        { name: 'backgroundImage', type: 'url', defaultValue: '' },
        { name: 'backgroundColor', type: 'color', defaultValue: '' },
        { name: 'textColor', type: 'color', defaultValue: 'white' },
        { name: 'buttonColor', type: 'color', defaultValue: 'white' },
        { name: 'buttonTextColor', type: 'color', defaultValue: '#667eea' },
        { name: 'height', type: 'number', defaultValue: 300 },
        { name: 'showButton', type: 'boolean', defaultValue: true }
    ]
});

Builder.registerComponent(ProductGrid, {
    name: 'ProductGrid',
    inputs: [
        { name: 'title', type: 'text', defaultValue: 'Our Products' },
        { name: 'products', type: 'list', defaultValue: [] },
        { name: 'columns', type: 'number', defaultValue: 4 },
        { name: 'backgroundColor', type: 'color', defaultValue: 'transparent' },
        { name: 'textColor', type: 'color', defaultValue: '#333' },
        { name: 'cardBackgroundColor', type: 'color', defaultValue: 'white' },
        { name: 'showTitle', type: 'boolean', defaultValue: true },
        { name: 'showPrice', type: 'boolean', defaultValue: true },
        { name: 'showDescription', type: 'boolean', defaultValue: true },
        { name: 'showButton', type: 'boolean', defaultValue: true }
    ]
});

Builder.registerComponent(Footer, {
    name: 'Footer',
    inputs: [
        { name: 'companyName', type: 'text', defaultValue: 'Your Store' },
        { name: 'email', type: 'text', defaultValue: 'info@store.com' },
        { name: 'phone', type: 'text', defaultValue: '' },
        { name: 'address', type: 'text', defaultValue: '' },
        { name: 'backgroundColor', type: 'color', defaultValue: '#333' },
        { name: 'textColor', type: 'color', defaultValue: 'white' },
        { name: 'links', type: 'list', defaultValue: [] },
        { name: 'socialLinks', type: 'list', defaultValue: [] },
        { name: 'showLogo', type: 'boolean', defaultValue: false },
        { name: 'logo', type: 'url', defaultValue: '' }
    ]
});

// Main CreateStorefront Component
export default function CreateStorefront() {
    const [content, setContent] = useState(null);
    const [saved, setSaved] = useState(false);
    const [device, setDevice] = useState('desktop');
    const [loading, setLoading] = useState(true);
    const [tenantInfo, setTenantInfo] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    // const isPreviewing = useIsPreviewing();

    useEffect(() => {
        loadStorefrontData();
    }, []);

    const loadStorefrontData = async () => {
        try {
            const tenantId = localStorage.getItem('tenantId');
            const data = await getStorefrontSettings(tenantId);

            if (data) {
                setContent(data.builderContent || null);
                setTenantInfo(data.tenantInfo || {});
            }
        } catch (error) {
            console.error('Error loading storefront data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const handleSave = async () => {
        try {
            const tenantId = localStorage.getItem('tenantId');
            await saveStorefrontSettings(tenantId, {
                builderContent: content,
                tenantInfo: tenantInfo
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error('Error saving storefront:', error);
            alert('Failed to save storefront settings.');
        }
    };

    const handleDeviceToggle = (selectedDevice) => {
        console.log('Selected device:', selectedDevice);
        setDevice(selectedDevice);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading storefront...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="storefront-pro flex-row d-flex min-vh-100 bg-body-tertiary">
            {/* Builder Sidebar */}
            <BuilderSidebar
                isEditing={isEditing}
                onToggleEditMode={toggleEditMode}
                onSave={handleSave}
                saved={saved}
                tenantInfo={tenantInfo}
            />

            {/* Live Preview */}
            <PreviewArea
                content={content}
                device={device}
                onDeviceToggle={handleDeviceToggle}
                tenantInfo={tenantInfo}
                isEditing={isEditing}
                onContentChange={handleContentChange}
            />
        </div>
    );
}
