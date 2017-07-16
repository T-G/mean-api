var 
    express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path");

var 
    index = require("./routes/index"),
    tasks = require("./routes/tasks");

// SET SERVER PORT
var port = process.env.port || 3000;

// CREATE SERVER 
var app = express();

// VIEW ENGINES
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// SET Static folder or Public folder
app.use(express.static(path.join(__dirname, 'client')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
    console.log(`Server is running on ${port} ...`);
})