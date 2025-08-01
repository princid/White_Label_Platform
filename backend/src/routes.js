import express from 'express';
export const router = express.Router();


router.get('/products', async (req, res) => {
    try {
        const { rows } = await req.db.query(`SELECT * FROM products`);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


router.post('/products', async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || price == null) {
            return res.status(400).json({ error: 'Name and price are required' });
        }
        const { rows } = await req.db.query(
            `INSERT INTO products(name, price) VALUES($1, $2) RETURNING *`,
            [name, price]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Save storefront design settings for the tenant
router.post('/storefront-settings', async (req, res) => {
    try {
        const { settings } = req.body;
        if (!settings) {
            return res.status(400).json({ error: 'Missing settings in request body' });
        }
        // Upsert: if a row exists, update; else insert
        let result;
        const { rows } = await req.db.query('SELECT id FROM storefront_settings LIMIT 1');
        if (rows.length > 0) {
            result = await req.db.query('UPDATE storefront_settings SET settings = $1 WHERE id = $2 RETURNING *', [settings, rows[0].id]);
        } else {
            result = await req.db.query('INSERT INTO storefront_settings (settings) VALUES ($1) RETURNING *', [settings]);
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error saving storefront settings:', err);
        res.status(500).json({ error: 'Failed to save storefront settings' });
    }
});

// Fetch storefront design settings for the tenant
router.get('/storefront-settings', async (req, res) => {
    try {
        const { rows } = await req.db.query('SELECT settings FROM storefront_settings ORDER BY id DESC LIMIT 1');
        if (rows.length > 0) {
            res.json(rows[0].settings);
        } else {
            res.json(null);
        }
    } catch (err) {
        console.error('Error fetching storefront settings:', err);
        res.status(500).json({ error: 'Failed to fetch storefront settings' });
    }
});