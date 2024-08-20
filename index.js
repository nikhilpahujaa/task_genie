const express = require('express');
const connectDB = require('./db'); // This path should be correct now
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

connectDB();
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Task Genie API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
