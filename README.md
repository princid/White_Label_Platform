# White Label Platform

A customizable white-label platform with storefront builder capabilities, built with React and Vite.

## Project Overview

This platform enables tenants to create and customize their own storefronts using a drag-and-drop builder interface powered by Builder.io components. The project is structured as a monorepo with separate frontend and backend directories.

## Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Setting Up the Project

1. Clone the repository:
```bash
git clone https://github.com/princid/white-label-platform.git
cd white-label-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Builder.io Integration

This project uses a customized implementation of Builder.io concepts for the storefront builder.

### Builder Components

The platform includes several pre-built components that can be used in the builder interface:

- **Header**: Customizable page headers with title, subtitle, background color options
- **Navigation**: Navigation bars with customizable menu items and styling
- **Hero**: Hero sections with customizable background, text, and buttons
- **ProductGrid**: Display products in a customizable grid layout
- **Footer**: Page footers with customizable content and styling

### How the Builder Works

1. The builder uses a custom drag-and-drop interface that lets users add components to their storefront.
2. Each component has editable properties that can be modified through the sidebar.
3. Components can be added, removed, and rearranged on the page.
4. The builder saves the configuration which can later be rendered as a custom storefront.

### Usage

To use the storefront builder:

1. Start the frontend application:
```bash
cd frontend
npm run dev
```

2. Start the backend server:
```bash
cd backend
node src/index.js
```

3. Access the builder interface at `http://localhost:5173/builder`

4. Drag components from the sidebar onto the preview area to build your storefront.

5. Customize component properties using the sidebar options.

6. Save your storefront configuration.

### Environment Variables

The project uses the following Builder.io related environment variables:

- `VITE_PUBLIC_BUILDER_KEY`: Your Builder.io public API key (used in the frontend)

### Extending the Builder

To add new components to the builder:

1. Create a new component in the `frontend/src/components/BuilderComponents` directory
2. Register the component in `CreateStorefront.jsx` using the Builder.registerComponent method
3. Define the component's editable properties as inputs
4. Add the component to the ComponentLibrary.jsx to make it available in the sidebar

## Development

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
```bash
cd backend
node src/index.js
```
