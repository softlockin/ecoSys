const express = require('express');
const path = require('path');
//const sqlite3 = require('sqlite3').verbose();
const pdfMake = require('pdfmake/build/pdfmake.js');
const vfs_fonts = require('pdfmake/build/vfs_fonts.js');
const fs = require('fs');
const open = require('./dist/open/index')

const app = express();
const port = process.env.port || 3000;

const rawdata = fs.readFileSync(path.join(__dirname,"ownerDetails.json"))
const owner = JSON.parse(rawdata)
const customerData = fs.readFileSync(path.join(__dirname,"/backend/customerDB.json"))
const customers = JSON.parse(customerData)


//app.use(express.static(__dirname))
app.use(express.static("./"))
app.use(express.static("./frontend"))
app.use(express.static("./backend"))

app.get("/data",(req,res)=>{
    res.json(owner)
})

app.get("/customerData", (req,res) =>{
    res.json(customers)
})

app.listen(port,()=>{
    console.log(`Listens on: ${port}`)
    open("http://localhost:3000")
})