// Use mock API when backend is not available
import * as mockApi from './mockApi.js';

// Check if backend is available, fallback to mock
const USE_MOCK_API = true; // Set to false when backend is available

async function checkBackendHealth() {
    try {
        const res = await fetch('http://localhost:4000/health', {
            method: 'GET',
            timeout: 1000
        });
        return res.ok;
    } catch {
        return false;
    }
}

export async function createTenant(subdomain) {
    if (USE_MOCK_API) {
        return mockApi.createTenant(subdomain);
    }

    const res = await fetch('http://localhost:4000/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomain: subdomain || '' })
    });
    return res.json(); // { tenantId, db_name }
}

export async function listProducts(tenantId) {
    if (USE_MOCK_API) {
        return mockApi.listProducts(tenantId);
    }

    const res = await fetch('http://localhost:4000/api/products', {
        headers: { 'X-Tenant-Id': tenantId }
    });
    return res.json();
}

export async function addProduct(tenantId, product) {
    if (USE_MOCK_API) {
        return mockApi.addProduct(tenantId, product);
    }

    const res = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Tenant-ID': tenantId
        },
        body: JSON.stringify(product)
    });
    return res.json();
}

export async function saveStorefrontSettings(tenantId, settings) {
    if (USE_MOCK_API) {
        return mockApi.saveStorefrontSettings(tenantId, settings);
    }

    const res = await fetch('http://localhost:4000/api/storefront-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Tenant-ID': tenantId,
        },
        body: JSON.stringify({ settings }),
    });
    if (!res.ok) throw new Error('Failed to save storefront settings');
    return res.json();
}

export async function getStorefrontSettings(tenantId) {
    if (USE_MOCK_API) {
        return mockApi.getStorefrontSettings(tenantId);
    }

    const res = await fetch('http://localhost:4000/api/storefront-settings', {
        headers: {
            'Content-Type': 'application/json',
            'X-Tenant-ID': tenantId,
        },
    });
    if (!res.ok) throw new Error('Failed to fetch storefront settings');
    return res.json();
}
