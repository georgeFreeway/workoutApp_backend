const express = require('express');
require('dotenv').config();
const dataRouter = require('./routes/dataRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//init server
const app = express();

//connect to the database
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server is connected and running on:', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use('/api', dataRouter);
app.use('/users', userRouter);
app.get('/', (req, res) => {
    res.send('welcome');
});
