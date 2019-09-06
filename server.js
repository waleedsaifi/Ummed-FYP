const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const upload = require('./handlers/multer')


// require('./handlers/cloudinary');

//MiddleWare
app.use(bodyParser.json());
app.use(morgan())

//DataBase Connection
require("./mongo");

//Models
require("./model/Signup");  

//Routes
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));





//Middleware for 404 error generator
app.use((req, res, next)=>{
    req.status=404;
    const error = new Error("route not found");
    next(error) ;
    })
    
    //Error Handler
app.use((error, req, res, next)=>{    
    res.status(req.status || 500 ).send({
        message: error.message,
        stack: error.stack
    });
    });
    
const port = process.env.PORT || 5000;
app.listen(port, ()=> {  
console.log(`Umeed Server is running at port ${port}`);
})