const express = require("express");
const app = express();

const logParams = (req, res, next) => {
  console.log("This is a middleware");
  // console.log("req.params", req.params.id);
  console.log("req.url from our middleware", req.url);
  next();
};

// middlewares
app.use(logParams);

// respond with "hello world" when a GET request is made to the homepage
app.get("/monkey", (req, res) => {
  res.send("hello, monkey!");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use( (req, res, next) => {
  let err = new Error("This resource was not found");
  console.log("404 handler");
  err.status = 404;
  next(err);
})

app.use( (err, req, res, next) => {
  // one error handler to rule them all
  res.json({
    message: "You blew it",
    err: err.message
  });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
