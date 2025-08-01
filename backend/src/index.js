import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initRegistry } from './dbRegistry.js';
import { provisionTenant } from './tenantProvision.js';
import { tenantMiddleware } from './tenantRouter.js';
import { router } from './routes.js';

async function main() {
    const registryClient = await initRegistry();
    const app = express();

    // Allow CORS for localhost and tenant subdomains
    app.use(cors({
        origin: (origin, callback) => {
            // Allow requests from localhost:5173 and subdomains like tenant-1.localhost:5173
            if (!origin || origin.match(/^http:\/\/(\w+\.)?localhost:5173$/)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    }));
    app.use(bodyParser.json());

    // Endpoint to onboard a new store
    app.post('/tenants', async (req, res) => {
        try {
            const { subdomain } = req.body;

            // Validate subdomain if provided
            let inputSubdomain = subdomain?.trim().toLowerCase();
            if (inputSubdomain && !/^[a-z0-9-]+$/.test(inputSubdomain)) {
                return res.status(400).json({ error: 'Invalid subdomain format. Use letters, numbers, or hyphens only.' });
            }

            // Call provisionTenant with subdomain (or undefined to trigger default generation)
            const info = await provisionTenant(registryClient, inputSubdomain);

            // If no subdomain was provided, generate a default one
            const finalSubdomain = inputSubdomain || `tenant-${info.tenantId}`;
            if (!inputSubdomain) {
                // Update the tenant record with the default subdomain
                await registryClient.query(
                    `UPDATE tenants SET subdomain = $1 WHERE id = $2`,
                    [finalSubdomain, info.tenantId]
                );
            }

            console.log('Tenant provisioned:', { ...info, subdomain: finalSubdomain });
            res.json({ ...info, subdomain: finalSubdomain });
        } catch (err) {
            console.error('Error in /tenants:', err);
            res.status(500).json({ error: err.message || 'Internal Server Error' });
        }
    });

    // Tenant-aware routes
    app.use(tenantMiddleware(registryClient));
    app.use('/api', router);

    app.listen(4000, () => {
        console.log('Backend listening on http://localhost:4000');
    });
}

main().catch(console.error);