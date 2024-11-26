import express from 'express';
import dotenv from 'dotenv';
import { db } from './src/database/db.config.js';
import routes from './src/api/routes/routes.js';

dotenv.config();

const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// Test routes
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello world!' });
});

// API routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
