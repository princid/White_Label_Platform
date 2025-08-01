import pkg from 'pg';
const { Client } = pkg;

export async function initRegistry() {
    try {
        // Use environment variables for connection strings
        const sysConnStr = process.env.PG_SYS_CONN || 'postgres://localhost:5432/postgres';
        const regConnStr = process.env.PG_REG_CONN || 'postgres://localhost:5432/registry';

        const sys = new Client({ connectionString: sysConnStr });
        try {
            await sys.connect();
            await sys.query(`CREATE DATABASE IF NOT EXISTS registry`).catch(() => { });
        } catch (err) {
            console.error('Error initializing system database:', err);
            throw new Error('Failed to initialize system database');
        } finally {
            await sys.end();
        }

        const reg = new Client({ connectionString: regConnStr });
        try {
            await reg.connect();
            await reg.query(`
                CREATE TABLE IF NOT EXISTS tenants (
                    id SERIAL PRIMARY KEY,
                    db_name TEXT NOT NULL UNIQUE,
                    subdomain TEXT NOT NULL UNIQUE
                )
            `);
        } catch (err) {
            console.error('Error initializing registry database:', err);
            throw new Error('Failed to initialize registry database');
        }
        return reg;
    } catch (err) {
        console.error('Error in initRegistry:', err);
        throw err;
    }
}