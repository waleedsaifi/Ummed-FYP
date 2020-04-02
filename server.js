const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
// const upload = require('./handlers/multer')
// require('./handlers/cloudinary');
  
io.on("connection" , socket => {
    console.log("User Connected :D");
    socket.on("chat message" , msg =>{
        console.log(msg);
        io.emit("chat message" , msg);
    })   
} )
//MiddleWare
app.use(bodyParser.json());
app.use(morgan())
app.use('/uploads', express.static('uploads'));
app.use(cors());


//DataBase Connection
require("./mongo");

//Models
require("./model/Signup");

//Routes
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/getAccount", require("./routes/getAccount")); 



//Middleware for 404 error generator
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("route not found");
    next(error);
})

//Error Handler
app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    });  
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Umeed Server is running at port ${port}`);
})   