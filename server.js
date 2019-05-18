var express = require("express")
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8081;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

var events = require('./Events.js');

// Basic route that sends the user first to the AJAX Page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    
});

app.get("/events", function (req, res) {
    res.sendFile(path.join(__dirname, "public/events.html"));
});

app.get("/api/events", function (req, res) {
    return res.json(events);
});


// Create New Events - takes in JSON input
app.post("/events", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newEvent = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newEvent.events = newEvent.eventName.replace(/\s+/g, "").toLowerCase();

    console.log(newEvent);

    events.push(newEvent);

    res.json(newEvent);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});