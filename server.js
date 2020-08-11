const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

  
//MiddleWare
app.use(bodyParser.json());
app.use(morgan())
app.use('/uploads', express.static('uploads'));
app.use(cors());


//DataBase Connection
require("./mongo");

//Models
require("./model/Signup");
require("./model/Feedback");
require("./model/ProgressReport");
require("./model/MotivationalBlogs");
require("./model/HealthExercises");
require("./model/MotivationalVideos");
require("./model/MakePayment");
require("./model/PsychologistsBookSlots");
require("./model/Patient/WriteSuccessStory");
require("./model/CreateSessions");
require("./model/Psychologist/PsychologistRatings");
require("./model/ReportProfile");
require("./model/SystemAccount");




//Routes
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/getAccount", require("./routes/getAccount"));
app.use("/reportProfile", require("./routes/reportProfile")); 
app.use("/feedback", require("./routes/feedback")); 
app.use("/progressReport", require("./routes/progressReport"));
app.use("/motivationalblogs", require("./routes/motivationalBlogs"));
app.use("/healthexercises", require("./routes/healthExercises"));
app.use("/motivationalvideos", require("./routes/motivationalVideos"));
app.use("/pendingAccounts", require("./routes/pendingAccounts"));
app.use("/makePayment", require("./routes/makePayments"));
app.use("/writeSuccessStory", require("./routes/Patient/writeSuccessStory"));
app.use("/getPsychologistList", require("./routes/Patient/pychologistsList"));
app.use("/getPatientList", require("./routes/Psychologist/patientsList"));



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