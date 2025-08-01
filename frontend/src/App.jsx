
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTenant, listProducts, addProduct } from './api';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {
	const [tenantId, setTenantId] = useState(() => {
		const stored = localStorage.getItem('tenantId');
		return stored ? parseInt(stored, 10) : null;
	});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (tenantId) {
			localStorage.setItem('tenantId', tenantId);
		} else {
			localStorage.removeItem('tenantId');
		}
	}, [tenantId]);

	async function handleNewTenant() {
		setLoading(true);
		setError('');
		try {
			const { tenantId } = await createTenant();
			setTenantId(tenantId);
			setProducts([]);
		} catch (err) {
			setError('Failed to create store.');
		}
		setLoading(false);
	}

	async function loadProducts() {
		setLoading(true);
		setError('');
		try {
			const products = await listProducts(tenantId);
			setProducts(products);
		} catch (err) {
			setError('Failed to load products.');
		}
		setLoading(false);
	}

	// Placeholder for handleAddProduct (if needed)
	async function handleAddProduct() {
		const name = prompt('Enter product name:');
		if (!name) return;
		const priceStr = prompt('Enter product price:');
		const price = parseFloat(priceStr);
		if (isNaN(price)) {
			setError('Invalid price.');
			return;
		}
		setLoading(true);
		setError('');
		try {
			await addProduct(tenantId, { name, price });
			await loadProducts();
		} catch (err) {
			setError('Failed to add product.');
		}
		setLoading(false);
	}

	return (
		<div className="app-container p-4">
			<h1 className="main-title">Multi‑Tenant Store Platform</h1>
			<div className="card">
				{!tenantId ? (
					<div>
						<p className="subtitle">Create a new store to get started.</p>
						<button className="primary-btn w-100 mb-3" onClick={handleNewTenant} disabled={loading}>
							{loading ? 'Creating...' : 'Create New Store'}
						</button>
						<button className="secondary-btn w-100" onClick={() => navigate('/new')}>
							Go to New Store Page
						</button>
						{error && <div className="error-msg">{error}</div>}
					</div>
				) : (
					<>
						<div>
							<div className="store-header">
								<div className="store-id mb-3">Store ID: <b>{tenantId}</b></div>
								<div className='d-flex align-items-center justify-content-between'>
									<button className="secondary-btn" onClick={loadProducts} disabled={loading}>
										{loading ? 'Loading...' : 'List Products'}
									</button>
									<button className="primary-btn" onClick={handleAddProduct} disabled={loading}>
										Add Product
									</button>
								</div>
								<button className="secondary-btn w-100 mt-3" onClick={() => { setTenantId(null); setProducts([]); }}>
									Switch Store
								</button>
							</div>
							{error && <div className="error-msg">{error}</div>}
							<ul className="product-list">
								{products.length === 0 && <li className="empty">No products yet.</li>}
								{products.map(p => (
									<li key={p.id} className="product-item">
										<span className="product-name">{p.name}</span>
										<span className="product-price">${p.price}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="mt-4">
							<button className='primary-btn' onClick={() => navigate('/create-storefront/' + tenantId)}>
								Create your Storefront
							</button>
						</div>
					</>
				)}
			</div>
			<footer className="footer">&copy; {new Date().getFullYear()} White Label Platform</footer>
		</div>
	);
}