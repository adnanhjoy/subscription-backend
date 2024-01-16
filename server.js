const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const { subscriptionRouter } = require('./src/controller/subscriptionController');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())


// router 
app.use('/subscription', subscriptionRouter);


const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@backend.ounawju.mongodb.net/subscription`);
        console.log('Database is connected');
    } catch (error) {
        console.log('Database is not connected');
        console.error(error);
    }
}

connectDb();

app.use('/', (req, res) => {
    res.send('Server is Running...');
})

app.listen(port, () => {
    console.log(`Server Running Port ${port}`)
})