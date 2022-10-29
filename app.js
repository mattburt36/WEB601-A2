// Import express 
const express = require('express');
const session = require('express-session');

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const store = new session.MemoryStore();
const app = express();

//Use routes 
//------------------------------------------------------------
//Show the requests with requested url in the console window 
//Middleware
app.use((req, res, next) =>
{
    console.log(store);
    console.log(`${req.method} - ${req.url}`);
    next();
});

//Detect json payloads
app.use(express.json());
//Detect and handle url encoded posts 
app.use(express.urlencoded({extended: false}));

app.use(session(
    {
        secret: 'some secret',
        cookie: { maxAge: 30000},
        saveUninitialized: false,
        store
    }));

app.use('/users', usersRoute);
app.use('/posts', postsRoute);

//------------------------------------------------------------
//Listen to port 
//------------------------------------------------------------ 
app.listen(8000, () => 
{
    console.log('Server is running on port 8000');
});
//------------------------------------------------------------

/*
//Test data
//------------------------------------------------------------
const users = [
    {name: 'Matt', age: 25},
    {name: 'Ali', age: 32},
    {name: 'Hamish', age: 13}
];

const posts = [
    {title: 'My favorite foods'},
    {title: 'My favorite games'}
];
//------------------------------------------------------------

//Use routes 
//------------------------------------------------------------
//Show the requests with requested url in the console window 
//Middleware
app.use((req, res, next) =>
{
    console.log(store);
    console.log(`${req.method} - ${req.url}`);
    next();
});

//Detect json payloads
app.use(express.json());
//Detect and handle url encoded posts 
app.use(express.urlencoded({extended: false}));

app.use(session(
    {
        secret: 'some secret',
        cookie: { maxAge: 30000},
        saveUninitialized: false,
        store
    }));
//------------------------------------------------------------

//Post routes
//------------------------------------------------------------
//Create a user 
app.post('/', (req, res) =>
{
    const user = req.body;
    users.push(user);
    res.status(201).send('Created successfully');
});

//Create a post 
app.post('/posts', validateAuthToken, (req, res) =>
{
    const post = req.body;
    posts.push(post);
    res.status(201).send(posts);
});

//Login route
app.post('/login', (req, res) =>
{
    console.log(req.sessionID);
    const { username, password } = req.body;
    if(username && password)
    {
        if(req.session.authenticated)
        {
            res.json(req.session);
        }
        else
        {
            if(password === '123')
            {
                req.session.authenticated = true; 
                req.session.user = {
                    username, password
                };
                res.json(req.session);
            }
            else
            {
                res.status(403).json({ msg: 'Bad Credentials'});
            }
        }
    }else res.status(403).json({ msg: 'Bad Credentials'});
    console.log(username, password)
});
//------------------------------------------------------------

//Get routes 
//------------------------------------------------------------
//Send a message to the local host based on any path 
app.get('/', (req, res) => 
{
    res.send({msg: 'Hello', user: {}})
});

//Send the users to the local host based on the path /users
app.get('/users', (req, res) => 
{
    res.status(200).send(users);
})

//Find a user from users based on a url request 
app.get('/users/:name', (req, res) => 
{
    const {name} = req.params;
    const user = users.find((user) => user.name === name);
    if(user) res.status(200).send(user);
    else res.status(404).send('Not Found');
});

//Find a post based on a matching title in a url query 
app.get('/posts', (req, res) => 
{
    console.log(req.query);
    const {title} = req.query;
    if (title)
    {
        const post = posts.find((post) => post.title === title);
        if(post) res.status(200).send(post);
        else res.status(404).send('Not Found');
    }
    res.status(200).send(posts);
});

//Sign in route 
app.get('/signin', validateCookie, (req,res) =>
{
    res.cookie('session_id', '1234567');
    res.status(200).json({msg: 'Logged in'});
});

//Check if protected route 
app.get('/protected', validateCookie, (req, res) =>
{
    res.status(200).json({msg: 'You are authorized'});
});

//------------------------------------------------------------
//Listen to port 
//------------------------------------------------------------ 
app.listen(8000, () => 
{
    console.log('Server is running on port 8000');
});
//------------------------------------------------------------

//Functions
//------------------------------------------------------------
//Authorize a session based on a hard coded authorization token 
function validateAuthToken(req, res, next)
{
    console.log("hit");
    const { authorization } = req.headers;
    if(authorization && authorization === '1234')
    {
        next();
    }
    else
    {
        res.status(403).send({msg: 'Incorrect Credentials'});
    }
};

function validateCookie(req, res, next)
{
    const { cookies } = req;
    if('session_id' in cookies)
    {
        console.log("Session ID exists");
        if(cookies.session_id === '1234567') next();
        else res.status(403).send({msg: 'Not Authenticated'});
    }
    else res.status(403).send({msg: 'Not Authenticated'});
}
//------------------------------------------------------------*/