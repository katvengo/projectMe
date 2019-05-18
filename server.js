var express = require("express")
var path = require("path");

var app = express();

var PORT = 8081;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

var events = [{
        host: "yoda",
        eventName: "Yoda's Birthday Party",
        location: "Dagobah",
        private: true,
        description: "Jedi's only"
    },

];

// Basic route that sends the user first to the AJAX Page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    
});

app.get("/events", function (req, res) {
    res.sendFile(path.join(__dirname, "public/events.html"));
});




// Create New Events - takes in JSON input
app.post("/events", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newEvents = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newEvents.events = newEvents.eventName.replace(/\s+/g, "").toLowerCase();

    console.log(newEvents);

    events.push(newEvents);

    res.json(newEvents);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});