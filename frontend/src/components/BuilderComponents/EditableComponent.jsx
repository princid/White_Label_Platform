import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import Footer from './Footer';

const EditableComponent = ({ block, index, onMove, onRemove, onUpdate }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const getComponentByName = (name) => {
        const components = {
            'Header': Header,
            'Navigation': Navigation,
            'Hero': Hero,
            'ProductGrid': ProductGrid,
            'Footer': Footer
        };
        return components[name];
    };

    const Component = getComponentByName(block.component.name);

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const toIndex = index;
        if (typeof fromIndex === 'number' && typeof toIndex === 'number' && fromIndex !== toIndex) {
            onMove(fromIndex, toIndex);
        }
    };

    const handleRemove = () => {
        onRemove(index);
    };

    if (!Component) return null;

    return (
        <div
            className={`editable-component mb-3 p-3 border rounded position-relative ${
                isHovered ? 'border-primary' : 'border-light'
            } ${isDragOver ? 'bg-light' : ''}`}
            style={{ 
                background: 'white',
                transition: 'all 0.2s ease',
                cursor: 'move'
            }}
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsDragOver(false); }}
        >
            {/* Component Controls */}
            <div 
                className="component-controls position-absolute top-0 end-0 p-2"
                style={{ 
                    background: 'rgba(255,255,255,0.9)',
                    borderBottomLeftRadius: '8px',
                    zIndex: 10
                }}
            >
                <div className="d-flex gap-1">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onUpdate(index, block)}
                        title="Edit Component"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleRemove}
                        title="Remove Component"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Drag Handle */}
            <div 
                className="drag-handle position-absolute top-0 start-0 p-2"
                style={{ 
                    background: 'rgba(255,255,255,0.9)',
                    borderBottomRightRadius: '8px',
                    cursor: 'grab',
                    zIndex: 10
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </div>

            {/* Component Content */}
            <div className="mt-4">
                <Component {...block.component.options} />
            </div>
        </div>
    );
};

export default EditableComponent; 