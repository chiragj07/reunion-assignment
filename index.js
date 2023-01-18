const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json())

require('dotenv').config()

const port=process.env.PORT;

const DB= process.env.DB;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log('database connected successfully'))
.catch(err=>console.log(err));

app.listen(5000, ()=>console.log('listening to port 5000'))
app.use('/api', require('./Routes/routes.js'))



