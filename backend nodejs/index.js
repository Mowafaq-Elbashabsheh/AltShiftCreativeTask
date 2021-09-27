const express = require('express');
const client = require('./database');
const cors = require('cors');


client.connect();



const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');


app = express();

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use('/api', routes);



app.listen(8000, () => console.log('Listening to 8000'));