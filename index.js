const express = require("express");
const moment=require("moment");
const http = require("http");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const socketio = require("socket.io");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const { contactRouter } = require("./routes/contact.router");
const{Messagemodel}=require("./models/message.model");

app.get("/", (req, res) => {
    res.send("ASSESSMENT 15 BASIC API ENDPOINT");
})
app.use("/", userRouter);
app.use("/", contactRouter);

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {

    socket.on("userjoin", ({ username }) => {
        let obj = {
            username: "whatsapp",
            msg: `hi ${username} welcome to whatsapp`,
            time:moment().format('h:mm: a')
            }
        socket.emit("message",obj);
    })

    socket.on("chat",({username,msg,token})=>{
        let obj = {
            username,
            msg,
            time:moment().format('h:mm: a')
            }
        io.emit("message",obj);

        jwt.verify(token, process.env.key,async(err, decoded)=>{
            if(decoded){
                console.log(decoded);
                obj.userID=decoded.userID;
                const message=new Messagemodel(obj);
                await message.save();
            }else{
                console.log(err.message);
            }
        })
    })
})


server.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
        console.log(`server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log(error.message);
        console.log("unable to connect to the database");
    }
})