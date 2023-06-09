import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();

/** Generate short URL */
router.post('/short', async (req, res) => {
    const { orig_url: origUrl } = req.body;
    const base = process.env.BASE;

    try {
        let url = await Url.findOne({ origUrl });
        if (url) {
            res.json(url);
        } else {
            const urlId = nanoid();
            const shortUrl = `${base}/${urlId}`;

            url = new Url({
                origUrl,
                shortUrl,
                urlId,
                date: new Date(),
            });

            await url.save();
            res.json(url);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

/** Get long URL */
router.get('/longener/:urlId', async (req, res) => {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
        return res.json({ orig_url: url.origUrl });
    } else res.status(404).json('Not found short URL');
});

/** Delete short URL */
router.delete('/delete/:urlId', async (req, res) => {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(url)
    if (url) {
        const url = await Url.deleteOne({ urlId: req.params.urlId });
        return res.status(204);
    } else {
        res.status(404).json('Not found short URL');
    }
});

export default router;