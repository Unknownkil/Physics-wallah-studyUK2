const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importing the CORS package

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors());

// Function to make an authorized API request with a user-provided token
async function makeRequest(url, token) {
    try {
        const headers = {
            "Authorization": `Bearer ${token}`,
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.9.1"
        };
        
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Request failed:", error.response ? error.response.status : error.message);
        return null;
    }
}

// Middleware to check for token in the query parameters
app.use((req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ error: "Token is required" });
    }
    req.token = token;
    next();
});

// Route for My Batches
app.get('/my-batches', async (req, res) => {
    const url = "https://api.penpencil.co/v3/batches/my-batches";
    const data = await makeRequest(url, req.token);
    res.json(data);
});

// Route for Batch Details
app.get('/batches/:batchId/details', async (req, res) => {
    const batchId = req.params.batchId;
    const url = `https://api.penpencil.co/v3/batches/${batchId}/details`;
    const data = await makeRequest(url, req.token);
    res.json(data);
});

// Route for Topics in a Subject
app.get('/batches/:batchId/subject/:subjectId/topics', async (req, res) => {
    const { batchId, subjectId } = req.params;
    const url = `https://api.penpencil.co/v2/batches/${batchId}/subject/${subjectId}/topics?page=1`;
    const data = await makeRequest(url, req.token);
    res.json(data);
});

// Route for DPP Videos
app.get('/batches/:batchId/subject/:subjectId/contents/dpp-videos', async (req, res) => {
    const { batchId, subjectId } = req.params;
    const contentId = req.query.content_id;
    const url = `https://api.penpencil.co/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=DppVideos`;
    const data = await makeRequest(url, req.token);
    res.json(data);
});

// Route for DPP Notes
app.get('/batches/:batchId/subject/:subjectId/contents/dpp-notes', async (req, res) => {
    const { batchId, subjectId } = req.params;
    const contentId = req.query.content_id;
    const url = `https://api.penpencil.co/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=DppNotes`;
    const data = await makeRequest(url, req.token);
    res.json(data);
});

// Route for Notes
app.get('/batches/:batchId/subject/:subjectId/contents/notes', async (req, res) => {
    const { batchId, subjectId } = req.params;
    const contentId = req.query.content_id;
    const url = `https://api.penpencil.co/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=notes`;
    const data = await makeRequest(url, req.token);
    res.json(data);
});

// Route for Videos
app.get('/batches/:batchId/subject/:subjectId/contents/videos', async (req, res) => {
    const { batchId, subjectId } = req.params;
    const contentId = req.query.content_id;
    const url = `https://api.penpencil.co/v2/batches/${batchId}/subject/${subjectId}/contents?page=1&tag=${contentId}&contentType=videos`;
    const data = await makeRequest(url, req.token);
    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
