const express = require('express');
const routes = require('./routes.js');

const app = express();
const PORT = 3001;



// Route to serve static HTML files
app.use(express.static('public'));

// Import routes from the Express Router
app.use('/', routes);

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is running and app is listening on port " + PORT);
    } else {
        console.log("ERROR: Server cannot start.", error);
    }
});