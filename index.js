const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const fileupload = require("express-fileupload");
// router
const userRouter = require("./src/router/user.router");
const foodRouter = require("./src/router/food.router");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     // ...
//   })
// );
// app.use(fileupload());

app.use(userRouter);
app.use(foodRouter);
// app.use(express.static("public"));

app.listen(4000, () => {
  console.log("SERVER LISTEN ON PORT 4000");
});
