import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import NewTenant from './NewTenant';
import CreateStorefront from './CreateStorefront';

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/new" element={<NewTenant />} />
        <Route path="/create-storefront/:tenantId" element={<CreateStorefront />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
