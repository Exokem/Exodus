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

        var receivers = 0

        files.forEach(file => 
        {
            if (!index.files.includes(file))
            {
                index.files.push(file)
                receivers ++
            
                exodus.get('/' + file, (request, response) =>
                {
                    fs.readFile(__dirname + JSON_OUT + file, (err, content) =>
                    {
                        var data = JSON.parse(content)

                        response.json(data)
                    })
                })
            }
        }) 

        console.log(`Established receivers for ${receivers} file(s)`)
    })
}

const WJSON_OUT = `data/task/`

async function transformTitle(title)
{
    return title.replace(' ', '_')
}

async function writeJson(json)
{
    var path = `${WJSON_OUT}${transformTitle(json.title)}-${json.identifier}.vxtk`
    console.log(`Writing task data to '${path}'`)
    
    fs.writeFile(path, JSON.stringify(json), (err) =>
        {
            console.log(`Failed to write data to '${path}': ${err}`)
        })
}

async function eraseJson(json)
{
    var path = `${WJSON_OUT}${transformTitle(json.title)}-${json.identifier}.vxtk`

    fs.unlink(path, err =>
        {
            console.log(`Failed to erase data at '${path}': ${err}`)
        })
}