const http = require('http');
const fs = require('fs');
const express = require('express');
const exodus = express();
const path = require('path');

const hostname = '127.0.0.1';
const port = 8977;

exodus.use(express.static('content'))
exodus.use('/css', express.static(__dirname + 'content/css'))
exodus.use('/html', express.static(__dirname + 'content/html'))
exodus.use('/js', express.static(__dirname + 'content/js'))

exodus.get('', (req, res) =>
{
    res.sendFile(__dirname + '/content/html/exodus.html')
})

exodus.listen(port, hostname, () => 
{
    console.log(`Listening on http://${hostname}:${port}/`);
})