const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const members = require('./routes/members');
const admins = require('./routes/admins');
const clubs = require('./routes/clubs');
const items = require('./routes/items');
const requests = require('./routes/requests');
const requestForUser = require('./routes/requestForUser');
const requestForAdmin = require('./routes/requestForAdmin')
const cookieParser = require('cookie-parser');
const memberModel = require('./api/models/members');
const adminModel = require('./api/models/admins');

var jwt = require('jsonwebtoken');
const app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
connectDB();

app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(express.json({ extended: false })); // init middleware
app.use(cors({ origin: true, credentials: true })); // cors

// to use routes
app.use('/members',members);
app.use('/admins',admins);
app.use('/clubs', clubs);
app.use('/items',items);
app.use('/requests',requests);
app.use('/request', validateMember, requestForUser);
app.use('/adminDashboard',validateAdmin,requestForAdmin);


function validateMember(req, res, next) {

    jwt.verify(req.cookies.token, req.app.get('secretKey'),
      function(err, decoded) {
        if (err) {
          res.json({code: -1, status: 'error', message: err.message, data: null});
        } else {
        // add member id to request
          req.body.memberId = decoded.id;
          memberModel.findById(decoded.id, function(err, memberInfo){
            if (err)
              next(err);
            else {
              req.body.memberName = memberInfo.userName;
              req.body.memberEmail = memberInfo.email;
              next();
            }
          });
  
        }
      });
  }


  function validateAdmin(req, res, next) {

    jwt.verify(req.cookies.token, req.app.get('secretKey'),
      function(err, decoded) {
        if (err) {
          res.json({code: -1, status: 'error', message: err.message, data: null});
        } else {
        // add member id to request
          req.body.adminId = decoded.id;
          adminModel.findById(decoded.id, function(err, adminInfo){
            if (err)
              next(err);
            else {
              req.body.adminName = adminInfo.adminName;
              req.body.adminEmail = adminInfo.email;
              next();
            }
          });
  
        }
      });
  }

// express doesn't consider not found 404 as an error so
// we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// handle errors
app.use(function(err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({message: 'Not found'});
  else
    res.status(500).json({message: 'Something looks wrong :( !!!'});
});


app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));


  