const express = require("express")
const cookieParser = require("cookie-parser")
require("dotenv").config();

const cors = require('cors');

const app = express()

const port = 5000;

app.use(express.json())
app.use(cors(({
    origin: 'http://localhost:3000',
    credentials: true,
})))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Backend Working!!!")
})

const userRouter = require("./routes/userRoutes");
app.use("/api", userRouter);

const postRouter = require("./routes/postRoutes");
app.use("/api", postRouter);

app.listen(port, () => {
    console.log(`Listening on the port:${port}`)
})

