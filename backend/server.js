import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";
import {YSocketIO} from "y-socket.io/dist/server";


const app = express();
app.use(express.static("public"))

const httpServer = createServer(app)
const PORT = 3000


const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const ySocket = new YSocketIO(io)
ySocket.initialize()




app.get("/health", (req,res)=>{
    res.status(200).json({
        massage:"ok",
        succsess:true
    })
})

httpServer.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`)
})