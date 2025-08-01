import pkg from 'pg';
const { Client } = pkg;

export async function provisionTenant(registryClient, subdomain) {
    try {
        let finalSubdomain = null;
        let tenantId = null;
        // If subdomain is provided and valid, check uniqueness
        if (subdomain && typeof subdomain === 'string' && subdomain.trim() !== '') {
            const cleanSub = subdomain.trim().toLowerCase();
            if (!/^[a-z0-9-]+$/.test(cleanSub)) {
                throw new Error('Invalid subdomain format. Use letters, numbers, or hyphens only.');
            }
            const subdomainCheck = await registryClient.query(
                `SELECT id FROM tenants WHERE subdomain = $1`,
                [cleanSub]
            );
            if (subdomainCheck.rows.length > 0) {
                throw new Error('Subdomain already taken');
            }
            // Insert with provided subdomain
            let res;
            try {
                res = await registryClient.query(
                    `INSERT INTO tenants (subdomain, db_name) VALUES ($1, $2) RETURNING id;`,
                    [cleanSub, 'placeholder']
                );
                tenantId = res.rows[0].id;
                finalSubdomain = cleanSub;
            } catch (err) {
                console.error('Error inserting new tenant:', err);
                throw new Error('Failed to insert new tenant');
            }
        } else {
            // No subdomain provided: insert with placeholder, then generate default
            let res;
            try {
                res = await registryClient.query(
                    `INSERT INTO tenants (subdomain, db_name) VALUES ($1, $2) RETURNING id;`,
                    ['placeholder', 'placeholder']
                );
                tenantId = res.rows[0].id;
            } catch (err) {
                console.error('Error inserting new tenant:', err);
                throw new Error('Failed to insert new tenant');
            }
            finalSubdomain = `tenant-${tenantId}`;
            // Validate generated subdomain (should always pass regex)
            if (!/^[a-z0-9-]+$/.test(finalSubdomain)) {
                throw new Error('Generated subdomain is invalid');
            }
            // Ensure uniqueness (should always be unique)
            await registryClient.query(
                `UPDATE tenants SET subdomain = $1 WHERE id = $2`,
                [finalSubdomain, tenantId]
            );
        }

        // Update db_name to be unique with tenantId
        const db_name = `tenant_${tenantId}`;
        try {
            await registryClient.query(
                `UPDATE tenants SET db_name = $1 WHERE id = $2`,
                [db_name, tenantId]
            );
        } catch (err) {
            console.error('Error updating db_name for tenant:', err);
            throw new Error('Failed to update db_name for tenant');
        }

        const sysConnStr = process.env.PG_SYS_CONN || 'postgres://localhost:5432/postgres';
        const regConnStr = process.env.PG_REG_CONN || 'postgres://localhost:5432/registry';

        // Create the tenant's database
        const sys = new Client({ connectionString: sysConnStr });
        try {
            await sys.connect();
            const dbExistsRes = await sys.query(
                `SELECT 1 FROM pg_database WHERE datname = $1`,
                [db_name]
            );
            if (dbExistsRes.rows.length === 0) {
                await sys.query(`CREATE DATABASE ${db_name}`);
            }
        } catch (err) {
            console.error('Error creating/checking tenant database:', err);
            throw new Error('Failed to create/check tenant database');
        } finally {
            await sys.end();
        }

        // Build tenant DB connection string
        let tenantDbConnStr;
        try {
            const url = new URL(regConnStr);
            url.pathname = `/${db_name}`;
            tenantDbConnStr = url.toString();
        } catch (e) {
            tenantDbConnStr = `postgres://localhost:5432/${db_name}`;
        }

        // Create application tables in tenant's database
        const tenantDb = new Client({ connectionString: tenantDbConnStr });
        try {
            await tenantDb.connect();
            await tenantDb.query(`
                CREATE TABLE IF NOT EXISTS products (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    price NUMERIC NOT NULL
                );
                CREATE TABLE IF NOT EXISTS orders (
                    id SERIAL PRIMARY KEY,
                    product_id INTEGER REFERENCES products(id),
                    quantity INTEGER NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW()
                );
                CREATE TABLE IF NOT EXISTS storefront_settings (
                    id SERIAL PRIMARY KEY,
                    settings JSONB
                );
            `);
        } catch (err) {
            console.error('Error creating tables in tenant DB:', err);
            throw new Error('Failed to create tables in tenant DB');
        } finally {
            await tenantDb.end();
        }

        return { tenantId, subdomain: finalSubdomain, db_name };
    } catch (err) {
        console.error('Error in provisionTenant:', err);
        throw err;
    }
}