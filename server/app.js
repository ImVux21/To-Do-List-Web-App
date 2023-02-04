
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();

const taskRoute = require('./routes/task.route');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const errorHandler = require('./errors/error-handler');

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5500'
}));
app.use(cookieParser());

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/to-do', taskRoute);
app.use('/api/users', userRoute);
app.use('/api/login', authRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const start = async () => {
    await mongoose.connect(process.env.MONGODB_LOCAL_URI)
        .then(() => console.log('Connected to mongodb'))
        .catch((err) => console.log(err));

    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
}

start();