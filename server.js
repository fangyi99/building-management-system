const express = require('express');
const app = express();

require('dotenv').config()
const PORT = process.env.PORT || 8000

const path = require("path");
app.set('view engine', 'html');
app.engine("html", require("ejs").renderFile);
app.set("views", [
    path.resolve(__dirname, "views/main"),
]);

//static paths
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "assets")));
app.use(express.static(path.resolve(__dirname, "views")));

app.use('/', require('./routes/route'))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})