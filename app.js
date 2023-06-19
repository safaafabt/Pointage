const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const { connectToDatabase } = require('./utils/database');

const app = express();

app.use(express.json());

connectToDatabase()
    .then(() => {
        console.log('Connected to MongoDB');
        app.use('/employees', employeeRoutes);
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });



