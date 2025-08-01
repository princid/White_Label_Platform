// Mock API for development when backend is not available
let tenants = [];
let products = {};
let storefrontSettings = {};
let nextTenantId = 1;
let nextProductId = 1;

// Helper to simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export async function createTenant(subdomain) {
    await delay();
    const tenantId = nextTenantId++;
    const tenant = {
        tenantId,
        subdomain: subdomain || `store-${tenantId}`,
        db_name: `db_tenant_${tenantId}`,
        created_at: new Date().toISOString()
    };
    tenants.push(tenant);
    products[tenantId] = [];
    console.log('[Mock API] Created tenant:', tenant);
    return tenant;
}

export async function listProducts(tenantId) {
    await delay();
    const tenantProducts = products[tenantId] || [];
    console.log('[Mock API] Listed products for tenant', tenantId, ':', tenantProducts);
    return tenantProducts;
}

export async function addProduct(tenantId, product) {
    await delay();
    if (!products[tenantId]) {
        products[tenantId] = [];
    }
    const newProduct = {
        id: nextProductId++,
        ...product,
        created_at: new Date().toISOString()
    };
    products[tenantId].push(newProduct);
    console.log('[Mock API] Added product to tenant', tenantId, ':', newProduct);
    return newProduct;
}

export async function saveStorefrontSettings(tenantId, settings) {
    await delay();
    storefrontSettings[tenantId] = {
        ...settings,
        updated_at: new Date().toISOString()
    };
    console.log('[Mock API] Saved storefront settings for tenant', tenantId, ':', settings);
    return { success: true };
}

export async function getStorefrontSettings(tenantId) {
    await delay();
    const settings = storefrontSettings[tenantId] || {};
    console.log('[Mock API] Retrieved storefront settings for tenant', tenantId, ':', settings);
    return settings;
}
