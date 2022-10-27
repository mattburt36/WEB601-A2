// Import express 
const express = require('express');

const app = express();

app.get('/', (req, res) => 
{
    res.send({msg: 'Hello', user: {}})
});

const users = [
    {name: 'Matt', age: 25},
    {name: 'Ali', age: 32},
    {name: 'Hamish', age: 13}
];

const posts = [
    {title: 'My favorite foods'},
    {title: 'My favorite games'}
];

app.get('/users', (req, res) => 
{
    res.status(200).send(users);
})

app.get('/users/:name', (req, res) => 
{
    const {name} = req.params;
    const user = users.find((user) => user.name === name);
    if(user) res.status(200).send(user);
    else res.status(404).send('Not Found');
});

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

app.listen(8000, () => 
{
    console.log('Server is running on port 8000');
});