
import pkg from 'pg';
import express from 'express';
const { Pool } = pkg;

export function tenantMiddleware(registryClient) {
    // cache Pools per db_name
    const poolCache = {};
    // get base connection string from env
    const regConnStr = process.env.PG_REG_CONN || 'postgres://localhost:5432/registry';

    return async function (req, res, next) {
        try {
            const tenantId = parseInt(req.header('X-Tenant-ID'));
            if (!tenantId) return res.status(400).json({ error: 'X-Tenant-ID required' });

            // lookup registry
            let r;
            try {
                r = await registryClient.query(
                    `SELECT db_name FROM tenants WHERE id=$1`, [tenantId]
                );
            } catch (err) {
                console.error('Error querying registry for tenant:', err);
                return res.status(500).json({ error: 'Error looking up tenant registry' });
            }

            if (r.rows.length === 0) return res.status(404).json({ error: 'Tenant not found' });

            const dbName = r.rows[0].db_name;

            if (!poolCache[dbName]) {
                // build connection string for this tenant db, preserving credentials
                let tenantDbConnStr;
                try {
                    const url = new URL(regConnStr);
                    url.pathname = `/${dbName}`;
                    tenantDbConnStr = url.toString();
                } catch (e) {
                    tenantDbConnStr = `postgres://localhost:5432/${dbName}`;
                }
                try {
                    poolCache[dbName] = new Pool({ connectionString: tenantDbConnStr });
                } catch (err) {
                    console.error('Error creating pool for tenant DB:', err);
                    return res.status(500).json({ error: 'Error connecting to tenant database' });
                }
            }
            req.db = poolCache[dbName];
            next();
        } catch (err) {
            console.error('Error in tenantMiddleware:', err);
            res.status(500).json({ error: 'Internal server error in tenant middleware' });
        }
    };
}