const app = require('express')();
const server = require('http').createServer(app);

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/185_socket.io.html`);
});

const io = require('socket.io')(server);

io.on('connection', (client) => {
    console.log('Client connection');

    client.on('clientmsg', (data) => {
        console.log('This is client Data:', data);
        client.emit('msg', data);
    });

    client.on('status', ()=>{
        console.log('Status event(Server)');
        setInterval(() => {
            client.emit('msg2', 'Hello socket.io');
        }, 3000);
    });
});

server.listen(3000, () => {
    console.log('Server is running ports 3000!');
});