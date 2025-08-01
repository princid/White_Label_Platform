import { useNavigate } from 'react-router-dom';
import './App.css';

export default function NewTenant() {
  const navigate = useNavigate();
  return (
    <div className="app-container p-4">
      <h1 className="main-title">Create a New Store</h1>
      <div className="card">
        <p className="subtitle">Start a new store. You can always return to your last store from the home page.</p>
        <button className="primary-btn" onClick={() => navigate('/')}>Back to Home</button>
      </div>
      <footer className="footer">&copy; {new Date().getFullYear()} White Label Platform</footer>
    </div>
  );
}
