const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;


app.use(express.static(__dirname))


app.get("/", (res,req)=> {

    req.sendFile("/index.html", {root: __dirname});
})

app.get("/customers",(res,req)=>{

    req.sendFile("/customers.html",{root:__dirname});
})

app.get("/products",(res,req)=>{

    req.sendFile("/products.html",{root:__dirname});
})





app.listen(port, () =>{
    console.log(`Listens on port: ${port}`)
})



