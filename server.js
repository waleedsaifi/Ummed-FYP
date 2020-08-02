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
require("./model/Complaints");
require("./model/Feedback");
require("./model/ProgressReport");
require("./model/MotivationalBlogs");
require("./model/HealthExercises");
require("./model/Comments");
require("./model/MotivationalVideos");
require("./model/MakePayment");
require("./model/PsychologistsBookSlots");
require("./model/Patient/WriteSuccessStory");





//Routes
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/getAccount", require("./routes/getAccount"));
app.use("/complaints", require("./routes/complaints")); 
app.use("/feedback", require("./routes/feedback")); 
app.use("/progressReport", require("./routes/progressReport"));
app.use("/motivationalblogs", require("./routes/motivationalBlogs"));
app.use("/healthexercises", require("./routes/healthExercises"));
app.use("/motivationalvideos", require("./routes/motivationalVideos"));
app.use("/comments", require("./routes/comments"));
app.use("/pendingAccounts", require("./routes/pendingAccounts"));
app.use("/makePayment", require("./routes/makePayments"));
app.use("/writeSuccessStory", require("./routes/Patient/writeSuccessStory"));



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