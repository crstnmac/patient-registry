const cors = require("cors");
const exp = require("express");
const upload = require('express-fileupload')
const passport = require("passport");
const morgan = require("morgan");
const { connect } = require("mongoose");
const { success, error } = require("consola");

const { MONGO_HOST, REQUEST_TIMEOUT } = require("./config");
const PORT = 3003;

const app = exp();
app.use(morgan("dev"));

app.use(cors());
app.use(exp.json());
app.use(
  exp.urlencoded({
    extended: true,
  })
);
app.use(upload()); //file upload

app.use(passport.initialize());
require("./middlewares/passport")(passport);

app.get("/", (req, res) => {
  res.send("Server running");
});
// User Router Middleware
app.use("/api", require("./routes"));

const startApp = async () => {
  try {
    // Connection With DB
    await connect(MONGOHOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: REQUEST_TIMEOUT,
      autoIndex: true,
    })

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });

    // Start Listening for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
