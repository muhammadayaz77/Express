import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Route handler
app.get('/', (req, res) => {
  res.render('index');  // Ensure you have 'views/index.ejs' file
});
app.get('/profile/:username/:age', (req, res) => {
  res.send(`Wellcome , ${req.params.username} of age ${req.params.age}`);  // Ensure you have 'views/index.ejs' file
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
