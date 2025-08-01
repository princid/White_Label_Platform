import React, { useState, useEffect } from "react";
import EditableComponent from "./EditableComponent";
import BrowserBar from "./BrowserBar";
import Header from "./Header";
import Navigation from "./Navigation";
import Hero from "./Hero";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";

const PreviewArea = ({
  content,
  device,
  onDeviceToggle,
  tenantInfo,
  isEditing,
  onContentChange,
}) => {
  const [localContent, setLocalContent] = useState(content || { blocks: [] });
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    setLocalContent(content || { blocks: [] });
  }, [content]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      let jsonData = e.dataTransfer.getData("application/json");
      if (!jsonData) {
        jsonData = e.dataTransfer.getData("text/plain");
      }
      if (!jsonData) {
        console.warn("No component data found in drag transfer");
        return;
      }
      // If the data is a number, it's a reorder operation, not a new component
      if (!isNaN(jsonData) && jsonData.trim() !== "") {
        // Do nothing here; reordering is handled by EditableComponent
        return;
      }
      // Otherwise, parse as JSON (add new component)
      const componentData = JSON.parse(jsonData);
      if (!componentData.component || !componentData.props) {
        console.warn("Invalid component data structure:", componentData);
        return;
      }
      // Create a new block for the dropped component
      const newBlock = {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: componentData.component,
          options: componentData.props,
        },
        children: [],
      };
      // Add the new block to the content
      const updatedContent = {
        ...localContent,
        blocks: [...(localContent.blocks || []), newBlock],
      };
      setLocalContent(updatedContent);
      if (typeof onContentChange === "function") {
        onContentChange(updatedContent);
      }
    } catch (error) {
      console.error("Error dropping component:", error);
    }
  };

  const handleMoveComponent = (fromIndex, toIndex) => {
    const newBlocks = [...localContent.blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);

    const updatedContent = {
      ...localContent,
      blocks: newBlocks,
    };

    setLocalContent(updatedContent);
    if (typeof onContentChange === "function") {
      onContentChange(updatedContent);
    }
  };

  const handleRemoveComponent = (index) => {
    const newBlocks = localContent.blocks.filter((_, i) => i !== index);
    const updatedContent = {
      ...localContent,
      blocks: newBlocks,
    };

    setLocalContent(updatedContent);
    if (typeof onContentChange === "function") {
      onContentChange(updatedContent);
    }
  };

  const handleUpdateComponent = (index, block) => {
    // This will be implemented for component editing
    console.log("Update component:", index, block);
  };

  return (
    <main className="flex-grow-1 p-4 bg-body-tertiary">
      {/* Preview Header */}
      <div className="w-100 d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold mb-0">Live Preview</h2>
        <div className="device-frame-options d-flex gap-2">

            <button className={device === 'desktop' ? 'primary-btn' : 'secondary-btn'} onClick={() => onDeviceToggle('desktop')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-window-desktop" viewBox="0 0 16 16">
                    <path d="M3.5 11a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                    <path d="M2.375 1A2.366 2.366 0 0 0 0 3.357v9.286A2.366 2.366 0 0 0 2.375 15h11.25A2.366 2.366 0 0 0 16 12.643V3.357A2.366 2.366 0 0 0 13.625 1zM1 3.357C1 2.612 1.611 2 2.375 2h11.25C14.389 2 15 2.612 15 3.357V4H1zM1 5h14v7.643c0 .745-.611 1.357-1.375 1.357H2.375A1.366 1.366 0 0 1 1 12.643z" />
                </svg>
            </button>
            <button className={device === 'mobile' ? 'primary-btn' : 'secondary-btn'} onClick={() => onDeviceToggle('mobile')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
            </button>
        </div>
      </div>

      {/* Preview Frame */}
      <div
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ minHeight: 600 }}
      >
        <div
          className={`device-frame-${device} d-flex flex-column align-items-stretch justify-content-start`}
        >
          {/* Browser Bar */}
          <BrowserBar device={device} tenantInfo={tenantInfo} />

          {/* Builder.io Content */}
          <div
            className={`storefront-preview-pro flex-grow-1 w-100 d-flex flex-column ${
              isDragOver ? "drag-over" : ""
            }`}
            style={{
              padding: 0,
              background: "transparent",
              minHeight: 0,
              overflow: "hidden",
              border: isDragOver ? "2px dashed #007bff" : "none",
              backgroundColor: isDragOver
                ? "rgba(0, 123, 255, 0.1)"
                : "transparent",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isEditing ? (
              <div
                className="preview-content"
                style={{
                  height: "100%",
                  width: "100%",
                  padding: "20px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {localContent.blocks && localContent.blocks.length > 0 ? (
                  localContent.blocks.map((block, index) => (
                    <EditableComponent
                      key={`${block.component.name}-${index}`}
                      block={block}
                      index={index}
                      onMove={handleMoveComponent}
                      onRemove={handleRemoveComponent}
                      onUpdate={handleUpdateComponent}
                    />
                  ))
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "100%", minHeight: 400 }}
                  >
                    <div className="text-center text-muted">
                      <h4>No components yet</h4>
                      <p>
                        Drag components from the sidebar to start building your
                        storefront
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <StaticPreview content={localContent} device={device} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

// Static Preview Component (for when not in edit mode)
const StaticPreview = ({ content, device }) => {
  const getComponentByName = (name) => {
    const components = {
      Header: Header,
      Navigation: Navigation,
      Hero: Hero,
      ProductGrid: ProductGrid,
      Footer: Footer,
    };
    return components[name];
  };

  if (!content || !content.blocks || content.blocks.length === 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100%" }}
      >
        <div className="text-center">
          <h3>No content yet</h3>
          <p className="text-muted">
            Enter edit mode to start building your storefront
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-4"
      style={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {content.blocks.map((block, index) => {
        const ComponentName = block.component.name;
        const Component = getComponentByName(ComponentName);
        return Component ? (
          <div key={index} className="mb-4">
            <Component
              {...block.component.options}
              device={ComponentName === "ProductGrid" ? device : undefined}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default PreviewArea;
