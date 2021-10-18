const express = require("express");
const app = express();
const http = require("http");
const cors = require('cors')
const multer = require('multer');
const upload = multer({ dest: '/tmp/' });
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");



app.use(express.static("public"));
app.use(express.static("uploads"));
// body parser config
app.use(express.json());
app.use(cors())
app.use(
    express.urlencoded({
        extended: false,
    })
);

// Handlebars
app.engine(
    "handlebars",
    expressHandlebars({
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/uploads'))

// money enter routes logs
const dashboard = require("./routes/dataManager");
app.use("/", dashboard);

const port = process.env.PORT || 3400;

http.createServer(app).listen(port, () => {
    console.log(`Server running on port ${port}`);
});