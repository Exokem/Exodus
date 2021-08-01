const http = require('http')
const fs = require('fs')

const express = require('express')
const router = express.Router()
const exodus = express()

const path = require('path')

const hostname = '127.0.0.1'
const port = 8977

// Use parser middleware
exodus.use(express.urlencoded({ extended: false })) 
exodus.use(express.json())

// Include content directories
exodus.use(express.static('content'))
exodus.use('/css', express.static(__dirname + 'content/css'))
exodus.use('/html', express.static(__dirname + 'content/html'))
exodus.use('/js', express.static(__dirname + 'content/js'))
exodus.use('/icon', express.static(__dirname + 'content/icon'))

// Send main HTML to the frontend
exodus.get('', (req, res) =>
{
    res.sendFile(__dirname + '/content/html/exodus.html')
})

// Receive POST requests from the transponder
exodus.post(`/transponder`, (request, response) =>
{
    console.log(request.body)
    writeJson(request.body)
})

exodus.listen(port, hostname, () => 
{
    console.log(`Listening on http://${hostname}:${port}/`)
})

const JSON_OUT = `data/task/`

function writeJson(json)
{
    var path = `${JSON_OUT}task-${json.identifier}-${json.title}.vxtk`
    console.log(`Writing task data to '${path}'`)
    
    // fs.writeFile(path, JSON.stringify(json), (err) =>
    // {

    // })
}