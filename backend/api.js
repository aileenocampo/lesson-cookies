const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());
app.use(express.json());

//cors must be set to the react app's domain, and credentials allowed in order to successfully set cookies on the browser.
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(cookieParser())

app.get('/', (_, res) => res.send('Hello World!'));

//todo: Return an array containing the cookies from the request. - hint: Object.entries may come in handy.
app.get('/api/cookies', (request, response) => {
    var cookies = Object.entries(request.cookies);
    response.send(cookies);
});

//todo: Create a cookie with a random value.
app.post('/api/cookies/random', (request, response) => {
    const random = "A random cookie!" + Math.random();
    response.cookie("random", random);
    response.end();
});

//todo: Update the username cookie.
app.put('/api/cookies/username', (request, response) => {
    const username = "A user from the cookies!";
    response.cookie("username", username);
    response.end()
});

//example: This sets a cookie, used in the HeaderUserInfo.jsx file.
app.get('/api/cookies/username', (_, response) => {
    const username = 'A user from the cookie!'
    response.cookie('username', username)
    response.end();
});

//todo: Delete the username cookie.
app.delete('/api/cookies/username', (_, response) => {
    response.clearCookie('username');
    response.end();
});

const port = 5000;
app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}.`);
});