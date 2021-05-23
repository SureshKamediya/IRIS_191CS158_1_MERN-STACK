const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
var cors = require('cors');
const members = require('./routes/members');
const admins = require('./routes/admins');
const clubs = require('./routes/clubs');



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
connectDB();

app.use(cors({ origin: true, credentials: true })); // cors

app.use(express.json({ extended: false })); // init middleware

// to use routes
app.use('/members',members);
app.use('/admins',admins);
app.use('/clubs', clubs);



app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));


  