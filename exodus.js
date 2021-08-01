const http = require('http')
const fs = require('fs')

const express = require('express')
const router = express.Router()
const exodus = express()

const path = require('path')

const hostname = '127.0.0.1'
const port = 8977

const JSON_OUT = `/data/task/`

// Use parser middleware
exodus.use(express.urlencoded({ extended: false })) 
exodus.use(express.json())

exodus.use(express.static(`data`))
exodus.use(`/task`, express.static(__dirname + `data/task`))

// Include content directories
exodus.use(express.static(`content`))
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

var index = { files: [] }

refreshIndices()

exodus.get(JSON_OUT, (request, response) =>
{
    console.log(`Received request emission for '${JSON_OUT}'`)
    response.json(index)  
})

exodus.listen(port, hostname, () => 
{
    console.log(`Listening on http://${hostname}:${port}/`)
})

async function refreshIndices()
{
    fs.readdir(__dirname + JSON_OUT, (err, files) =>
    {
        if (err) { console.log(err); return }

        

        files.forEach(file => 
        {
            if (!index.files.includes(file))
            {
                index.files.push(file)
            
                exodus.get('/' + file, (request, response) =>
                {
                    console.log(`Received request emission for '${file}'`)

                    fs.readFile(__dirname + JSON_OUT + file, (err, content) =>
                    {
                        var data = JSON.parse(content)
                        
                        console.log(`Returning json data '${data} for '${file}''`)
                        response.json(data)
                    })
                })

                console.log(`Established receiver for '${file}'`)
            }
        }) 
    })
}

const WJSON_OUT = `data/task/`

async function writeJson(json)
{
    var path = `${WJSON_OUT}${json.title}-${json.identifier}.vxtk`
    console.log(`Writing task data to '${path}'`)
    
    fs.writeFile(path, JSON.stringify(json), (err) =>
    {

    })
}