const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

const studentRoutes = require('./api/routes/student');
const courseRoutes = require('./api/routes/course');
const teacherRoutes = require('./api/routes/teacher');
const weekRoutes = require('./api/routes/week');
const linkRoutes = require('./api/routes/link');
const lectureRoutes = require('./api/routes/lecture');
const quizRoutes = require('./api/routes/quiz');
const userRoutes = require('./api/routes/user');

// this is our MongoDB database
const dbRoute = "mongodb://bryanspahr:Firmino.9@ds259253.mlab.com:59253/mydb";

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    {useNewUrlParser: true}
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use("/quiz", quizRoutes);
app.use("/student", studentRoutes);
app.use("/course", courseRoutes);
app.use("/teacher", teacherRoutes);
app.use("/week", weekRoutes);
app.use("/link", linkRoutes);
app.use("/lecture", lectureRoutes);
app.use("/user", userRoutes);

module.exports = app;
