const http = require('http');
const qs = require('querystring')
const {GameField} = require("./SudokuAlgorithm/GameField");
const {LinkedList} = require("./SudokuAlgorithm/LinkedList");
const {initializeSolve} = require("./SudokuAlgorithm/SudokuSolver");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let body = '';
    let data;

    if(req.method === 'GET') {
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.end(fs.readFileSync('main.html'))
    }

    if (req.method === 'POST') {
        req.on('data', data => {
            body += data;
        })
        req.on('end', () => {
            data = qs.stringify(qs.parse(body));
            data = data.substring(0, data.length - 1);
            let sudoku = initializeSolve(data);
            res.writeHead(200,{'Content-Type': 'application/json'})
            res.end(JSON.stringify(sudoku));
        })
    }
}).listen(3000);

console.log('Listening on port 3000...')



