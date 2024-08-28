const express = require('express');
const connectDB = require('./db'); 
const taskRoutes = require('./routes/taskRoutes');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage});
app.use(express.json());

connectDB();
app.use('/tasks', taskRoutes(upload));

app.get('/', (req, res) => {
    res.send('Task Genie API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
