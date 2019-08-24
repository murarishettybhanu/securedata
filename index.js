require('dotenv').config();
const expressEdge = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const cloudinary = require('cloudinary');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const encryptController = require("./controllers/encrypt");
const decryptController = require("./controllers/decrypt");
const helpController = require("./controllers/help");
const mydataController = require("./controllers/mydata");
const deletedataController = require("./controllers/deletedata")

const app = new express();
mongoose.connect("mongodb://localhost/Secure_data");

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

app.get("/", homePageController);
app.get("/auth/logout", auth, logoutController);
app.post("/posts/store", auth, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/encrypt",encryptController);
app.get("/decrypt",decryptController);
app.get("/help",helpController);
app.get("/mydata",auth,mydataController);
app.get("/deletedata/:id",deletedataController)
app.use((req, res) => res.render('not-found'));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
