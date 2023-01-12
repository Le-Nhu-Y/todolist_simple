const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req, res) {
    if(req.method === 'GET') {
        fs.readFile('./view/todo.html',function (err, data){
            res.writeHead(200,{'Content-Type':'text/html'}); // đọc văn bản
            res.write(data);
            return res.end()
        });
    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userDisplay = qs.parse(data);
            fs.readFile('./view/display.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                datahtml = datahtml.replace('{name1}', userDisplay.name1);
                datahtml = datahtml.replace('{name2}', userDisplay.name2);
                datahtml = datahtml.replace('{name3}', userDisplay.name3);
                datahtml = datahtml.replace('{name4}', userDisplay.name4);
                datahtml = datahtml.replace('{name5}', userDisplay.name5);
                datahtml = datahtml.replace('{name6}', userDisplay.name6);

                datahtml = datahtml.replace('{name_1}', userDisplay.name_1);
                datahtml = datahtml.replace('{name_2}', userDisplay.name_2);
                datahtml = datahtml.replace('{name_3}', userDisplay.name_3);
                datahtml = datahtml.replace('{name_4}', userDisplay.name_4);
                datahtml = datahtml.replace('{name_5}', userDisplay.name_5);
                datahtml = datahtml.replace('{name_6}', userDisplay.name_6);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});