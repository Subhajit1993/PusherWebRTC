const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware
// Create an instance of Pusher
const pusher = new Pusher({
    appId: '373647',
    key: 'ab1c52c18d3850b82ed7',
    secret: '93e91c9e068ec733c6fc',
    cluster: 'ap2',
    encrypted: true
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

app.post("/pusher/auth", (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    var presenceData = {
        user_id:
        Math.random()
            .toString(36)
            .slice(2) + Date.now()
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

app.listen(3000, () => {
    return console.log('Server is up on 3000')
});