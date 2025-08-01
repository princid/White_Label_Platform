import React from 'react';

const BrowserBar = ({ device, tenantInfo }) => {
    return (
        <div style={{ 
            height: 32, 
            background: '#f1f3f7', 
            borderBottom: '1px solid #e3e6ea', 
            borderTopLeftRadius: device === 'desktop' ? 30 : 20, 
            borderTopRightRadius: device === 'desktop' ? 30 : 20, 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 16px', 
            gap: 8 
        }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e57373', display: 'inline-block' }}></span>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffb74d', display: 'inline-block' }}></span>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#81c784', display: 'inline-block' }}></span>
            <span className="ms-3 text-muted small" style={{ fontWeight: 500 }}>
                {tenantInfo.domain || 'storefront.local'}
            </span>
        </div>
    );
};

export default BrowserBar; 