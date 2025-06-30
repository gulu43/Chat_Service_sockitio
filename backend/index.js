import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { socketHeadersMethords } from './socketHandler.js'
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get directory of current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path: path.resolve(__dirname, ".env") 
    });
}

const app = express()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: `${process.env.CORS_ORIGIN_FRONTED}`,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    } 
}) 

// sockit headers
socketHeadersMethords(io)

app.use(cors({
  origin: `${process.env.CORS_ORIGIN_FRONTED}`,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], 
  credentials: false // only needed for cookies or sessions
}))

app.get('/',(req, res)=> {
    res.send(' ok server is lisning')
})

const _PORT = process.env.PORT || 8000;
console.log(`Running on port: ${_PORT}`);

server.listen(_PORT, ()=> {
    console.log('server is running ');
    
})

