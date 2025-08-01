import React, { useState, useEffect, useMemo } from 'react';
import { getStorefrontSettings, saveStorefrontSettings } from './api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useForm } from 'react-hook-form';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const HeaderSection = ({ settings }) => (
    <header className="bg-dark text-white p-4" style={{ backgroundColor: settings.bgColor || '#212529' }}>
        <h1 className="h3 mb-0">{settings.title || 'My Store'}</h1>
    </header>
);

const HeroSection = ({ settings }) => (
    <section className="p-5 text-center" style={{ backgroundColor: settings.bgColor || '#f8f9fa', padding: `${settings.padding}px` }}>
        <h2 className="display-4 mb-3">{settings.title || 'Welcome'}</h2>
        <p className="lead">{settings.subtitle || 'Discover amazing products!'}</p>
    </section>
);

const ProductSection = ({ settings }) => {
    const products = [
        { id: 1, name: 'Sneakers', price: 59.99 },
        { id: 2, name: 'Backpack', price: 129.99 },
    ];
    return (
        <section className="p-5" style={{ backgroundColor: settings.bgColor || '#ffffff', padding: `${settings.padding}px` }}>
            <h2 className="h4 mb-4">{settings.title || 'Featured Products'}</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const SectionSettings = ({ section, updateSection }) => {
    const { register, handleSubmit } = useForm({ defaultValues: section.settings });
    const onSubmit = (data) => updateSection({ ...section, settings: data });
    return (
        <div className="card p-4 shadow-sm">
            <h3 className="h5 mb-3">Settings: {section.type}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input className="form-control" {...register('title')} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Background Color</label>
                    <input type="color" className="form-control form-control-color" {...register('bgColor')} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Padding (px)</label>
                    <input type="range" min="0" max="100" className="form-range" {...register('padding')} />
                </div>
                {section.type === 'hero' && (
                    <div className="mb-3">
                        <label className="form-label">Subtitle</label>
                        <input className="form-control" {...register('subtitle')} />
                    </div>
                )}
                <button type="submit" className="btn btn-primary w-100">Apply</button>
            </form>
        </div>
    );
};

// Sortable Item Component
const SortableSection = ({ section, index, removeSection, setSelectedSection }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: isDragging ? '#e9ecef' : 'transparent',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="p-2 mb-2 rounded d-flex justify-content-between align-items-center"
            onClick={() => setSelectedSection(section)}
        >
            <div
                {...attributes}
                {...listeners}
                className="d-flex align-items-center gap-2"
                style={{ cursor: 'move' }}
            >
                <span className="bi bi-grip-vertical text-muted"></span>
                <span>{section.type.charAt(0).toUpperCase() + section.type.slice(1)}</span>
            </div>
            <button
                className="btn btn-danger btn-sm"
                onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
            >
                ✕
            </button>
        </div>
    );
};

export default function CreateStorefront() {
    const [sections, setSections] = useState([
        { id: 'header-1', type: 'header', settings: { title: 'My Store', bgColor: '#212529' } },
        { id: 'hero-1', type: 'hero', settings: { title: 'Welcome', bgColor: '#f8f9fa', padding: 24 } },
        { id: 'products-1', type: 'products', settings: { title: 'Featured Products', bgColor: '#ffffff', padding: 24 } },
    ]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [device, setDevice] = useState('desktop');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tenantId = localStorage.getItem('tenantId') || 'tenant123';
        getStorefrontSettings(tenantId).then(data => {
            if (data?.sections) setSections(data.sections);
            setLoading(false);
        });
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = sections.findIndex(s => s.id === active.id);
            const newIndex = sections.findIndex(s => s.id === over.id);
            setSections(arrayMove(sections, oldIndex, newIndex));
        }
    };

    const addSection = (type) => {
        const newSection = { id: `${type}-${Date.now()}`, type, settings: {} };
        setSections([...sections, newSection]);
        setSelectedSection(newSection);
    };

    const removeSection = (id) => {
        setSections(sections.filter(s => s.id !== id));
        if (selectedSection?.id === id) setSelectedSection(null);
    };

    const updateSection = (updatedSection) => {
        setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
    };

    const handleSave = async () => {
        const tenantId = localStorage.getItem('tenantId') || 'tenant123';
        await saveStorefrontSettings(tenantId, { sections });
        alert('Settings saved!');
    };

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100">Loading...</div>;

    return (
        <div className="container-fluid min-vh-100 bg-app px-0">
            <div className="row g-0 min-vh-100">
                {/* Left Sidebar: Section Management */}
                <aside className="col-12 col-md-3 col-lg-3 storefront-sidebar-pro border-end p-0 d-flex flex-column" style={{ minHeight: '100vh', width: '18%' }}>
                    <div className="p-4 border-bottom">
                        <h2 className="h4 mb-4">Sections</h2>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToVerticalAxis]}
                        >
                            <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                                <div className="list-group">
                                    {sections.map((section, index) => (
                                        <SortableSection
                                            key={section.id}
                                            section={section}
                                            index={index}
                                            removeSection={removeSection}
                                            setSelectedSection={setSelectedSection}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                        <div className="mt-4">
                            <button className="btn btn-primary w-100 mb-2" onClick={() => addSection('header')}>Add Header</button>
                            <button className="btn btn-primary w-100 mb-2" onClick={() => addSection('hero')}>Add Hero</button>
                            <button className="btn btn-primary w-100 mb-2" onClick={() => addSection('products')}>Add Products</button>
                        </div>
                        <button className="btn btn-success w-100 mt-4" onClick={handleSave}>Save Settings</button>
                    </div>
                </aside>

                {/* Central Preview - now expanded */}
                <main className="col-12 col-md-9 col-lg-9 p-4 d-flex flex-column align-items-center bg-preview" style={{ width: '82%' }}>
                    <div className="d-flex justify-content-between align-items-center w-100 mb-4">
                        <h2 className="h3 mb-0">Live Preview</h2>
                        <div className="d-flex gap-2">
                            <button className={`${device === 'desktop' ? 'primary-btn' : 'secondary-btn'}`} onClick={() => setDevice('desktop')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-window-desktop" viewBox="0 0 16 16">
                                    <path d="M3.5 11a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                    <path d="M2.375 1A2.366 2.366 0 0 0 0 3.357v9.286A2.366 2.366 0 0 0 2.375 15h11.25A2.366 2.366 0 0 0 16 12.643V3.357A2.366 2.366 0 0 0 13.625 1zM1 3.357C1 2.612 1.611 2 2.375 2h11.25C14.389 2 15 2.612 15 3.357V4H1zM1 5h14v7.643c0 .745-.611 1.357-1.375 1.357H2.375A1.366 1.366 0 0 1 1 12.643z" />
                                </svg>
                            </button>
                            <button className={`${device === 'mobile' ? 'primary-btn' : 'secondary-btn'}`} onClick={() => setDevice('mobile')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-center align-items-center preview-container">
                        <div className={`device-frame-${device} preview-frame`}>
                            {/* Simulated browser bar */}
                            <div style={{ display: 'flex', alignItems: 'center', height: 32, background: '#f1f3f7', borderBottom: '1px solid #e3e6ea', borderTopLeftRadius: device === 'desktop' ? 30 : 40, borderTopRightRadius: device === 'desktop' ? 30 : 40, padding: '0 16px', gap: 8 }}>
                                <span style={{ width: 12, height: 12, borderRadius: 6, background: '#f87171', display: 'inline-block' }}></span>
                                <span style={{ width: 12, height: 12, borderRadius: 6, background: '#fbbf24', display: 'inline-block' }}></span>
                                <span style={{ width: 12, height: 12, borderRadius: 6, background: '#34d399', display: 'inline-block' }}></span>
                            </div>
                            <div className="storefront-preview-pro" style={{ flexGrow: 1, width: '100%', minHeight: 0, overflowY: 'auto', background: 'transparent', display: 'flex', flexDirection: 'column', padding: 0 }}>
                                {sections.map(section => (
                                    section.type === 'header' ? <HeaderSection key={section.id} settings={section.settings} /> :
                                        section.type === 'hero' ? <HeroSection key={section.id} settings={section.settings} /> :
                                            section.type === 'products' ? <ProductSection key={section.id} settings={section.settings} /> : null
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Modal for Section Settings */}
                {selectedSection && (
                    <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.25)', zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Section: {selectedSection.type.charAt(0).toUpperCase() + selectedSection.type.slice(1)}</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedSection(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <SectionSettings section={selectedSection} updateSection={updateSection} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}