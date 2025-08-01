import React from 'react';
import ComponentLibrary from './ComponentLibrary';

const BuilderSidebar = ({ isEditing, onToggleEditMode, onSave, saved, tenantInfo }) => {
    return (
        <aside className="storefront-sidebar-pro d-flex flex-column align-items-center py-4 px-3 shadow-sm bg-white"
            style={{ width: 350, minWidth: 300, minHeight: '100vh', borderRight: '1px solid #eee' }}>

            {/* Header */}
            <div className="mb-4 w-100 d-flex align-items-center justify-content-center gap-2">
                <img src="/vite.svg" alt="Logo" height={32} />
                <span className="fs-5 fw-bold text-primary">Storefront Builder</span>
            </div>

            {/* Tenant Info */}
            {tenantInfo.name && (
                <div className="w-100 mb-3 p-3 bg-light rounded">
                    <h6 className="mb-2">Tenant: {tenantInfo.name}</h6>
                    {tenantInfo.domain && (
                        <small className="text-muted">{tenantInfo.domain}</small>
                    )}
                </div>
            )}

            {/* Action Buttons */}
            <div className="w-100 mb-3">
                <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={onToggleEditMode}
                >
                    {isEditing ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                </button>

                <button className="btn btn-success w-100" onClick={onSave}>
                    Save Storefront
                </button>

                {saved && (
                    <div className="alert alert-success mt-3 py-2 text-center w-100">
                        Storefront saved successfully!
                    </div>
                )}
            </div>

            {/* Component Library */}
            <ComponentLibrary />
        </aside>
    );
};

export default BuilderSidebar; 