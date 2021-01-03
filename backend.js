const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(__dirname))


app.get("/", (res,req)=> {

    req.sendFile("/index.html", {root: __dirname});

})




app.listen(port, () =>{
    console.log(`Listens on port: ${port}`)
})