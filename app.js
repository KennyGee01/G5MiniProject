import http from "http";
import express from "express";
const app = express();
const port = 3000;
const hostname = '127.0.0.1';
const server = http.createServer((req, res) => {
    if (req.url = '/'){
        res.statusCode = 200;
        res.end("welcome to restaurant reservation")
    }
});
server.listen(port, ()=>{
    console.log(`server running at http://${hostname}:${port}/`);
} )