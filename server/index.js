const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const path = require('path');

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes

// Root Route
app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running on Port ' + PORT);
});

// 1. Get Profile
app.get('/api/profile', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM profile LIMIT 1');
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 2. Get Journey (Experience & Education)
app.get('/api/journey', async (req, res) => {
    try {
        const [education] = await db.query('SELECT * FROM experiences WHERE type = "education" ORDER BY id DESC');
        const [experience] = await db.query('SELECT * FROM experiences WHERE type = "experience" ORDER BY id DESC');
        res.json({ education, experience });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 3. Get Skills (Ecosystem)
app.get('/api/skills', async (req, res) => {
    try {
        const [tools] = await db.query('SELECT * FROM skills');
        res.json(tools);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 4. Get Certificates
app.get('/api/certificates', async (req, res) => {
    try {
        const [certificates] = await db.query('SELECT * FROM certificates');
        res.json(certificates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// 5. Get Projects
app.get('/api/projects', async (req, res) => {
    try {
        // Fetch all projects
        const [projects] = await db.query('SELECT * FROM projects ORDER BY year DESC, id DESC'); // Order by year desc

        // Enhance projects with images and tech stack
        const enhancedProjects = await Promise.all(projects.map(async (project) => {
            const [images] = await db.query('SELECT image_url, position FROM project_images WHERE project_id = ? ORDER BY position ASC', [project.id]);
            const [techStack] = await db.query('SELECT name, color_class as color FROM project_tech_stack WHERE project_id = ?', [project.id]);

            // Format images based on display_mode
            let finalImages;
            if (project.display_mode === 'single') {
                finalImages = images.length > 0 ? images[0].image_url : null;
            } else {
                finalImages = images.map(img => img.image_url);
            }

            return {
                ...project,
                images: finalImages,
                techStack
            };
        }));

        // Sort manually if needed to match specific 2024->2026 ascending order if DB sort isn't enough
        // Current DB sort: 2026, 2025, 2024 (DESC) or 2024, 2025, 2026 (ASC)
        // User wanted: 2024 -> 2026. So let's sort by year ASC.

        enhancedProjects.sort((a, b) => parseInt(a.year) - parseInt(b.year));

        res.json(enhancedProjects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
