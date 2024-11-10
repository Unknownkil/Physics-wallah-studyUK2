const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

const BASE_URL = "https://api.penpencil.co";

// Middleware to check for token in URL
app.use((req, res, next) => {
    if (!req.query.token) {
        return res.status(400).json({ error: 'Token required' });
    }
    next();
});

// Function to make API call
async function makeApiCall(url, token) {
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept-Encoding": "gzip",
                "User-Agent": "okhttp/3.9.1"
            }
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        return { status: error.response?.status || 500, data: error.message };
    }
}

// Routes
app.get('/api/my-batches', async (req, res) => {
    const url = `${BASE_URL}/v3/batches/my-batches`;
    const result = await makeApiCall(url, req.query.token);
    res.status(result.status).json(result.data);
});

app.get('/api/batch-details', async (req, res) => {
    const { batchId } = req.query;
    if (!batchId) return res.status(400).json({ error: 'batchId required' });
    const url = `${BASE_URL}/v3/batches/${batchId}/details`;
    const result = await makeApiCall(url, req.query.token);
    res.status(result.status).json(result.data);
});

app.get('/api/topics', async (req, res) => {
    const { batchId, subjectId } = req.query;
    if (!batchId || !subjectId) return res.status(400).json({ error: 'batchId and subjectId required' });
    const url = `${BASE_URL}/v2/batches/${batchId}/subject/${subjectId}/topics?page=1`;
    const result = await makeApiCall(url, req.query.token);
    res.status(result.status).json(result.data);
});

app.get('/api/contents-dppnotes', async (req, res) => {
    const { batchId, subjectId, contentId } = req.query;
    if (!batchId || !subjectId || !contentId) return res.status(400).json({ error: 'batchId, subjectId, and contentId required' });
    const url = `${BASE_URL}/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=DppNotes`;
    const result = await makeApiCall(url, req.query.token);
    res.status(result.status).json(result.data);
});

app.get('/api/contents-dppvideos', async (req, res) => {
    const { batchId, subjectId, contentId } = req.query;
    if (!batchId || !subjectId || !contentId) return res.status(400).json({ error: 'batchId, subjectId, and contentId required' });
    const url = `${BASE_URL}/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=DppVideos`;
    const result = await makeApiCall(url, req.query.token);
    res.status(result.status).json(result.data);
});

app.get('/api/contents-notes', async (req, res) => {
    const { batchId, subjectId, contentId } = req.query;
    if (!batchId || !subjectId || !contentId) return res.status(400).json({ error: 'batchId, subjectId, and contentId required' });
    const url = `${BASE_URL}/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=notes`;
    const result = await makeApiCall(url, req.query.token);
    res.status(result.status).json(result.data);
});

app.get('/api/contents-videos', async (req, res) => {
    const { batchId, subjectId, contentId } = req.query;
    if (!batchId || !subjectId || !contentId) return res.status(400).json({ error: 'batchId, subjectId, and contentId required' });
    const url = `${BASE_URL}/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=videos`;
    const result = await makeApiCall(url, req.query.token);
    res.status(result.status).json(result.data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});