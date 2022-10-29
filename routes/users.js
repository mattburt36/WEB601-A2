const { Router } = require('express');
const db = require('../database');
const router = Router();

router.get('/', async(req, res) =>
{
    const results = await db.promise().query(`SELECT * FROM USERS`);
    res.status(200).send(results[0]);
})

router.get('/', (req,res) => 
{
    res.send(200);
});

router.get('/posts', (req, res) => 
{
    res.json({ route: 'Posts'});
})

router.post('/', (req, res) => 
{
    const {username, password } = req.body; 
    if(username && password)
    {
        try
        {
            db.promise().query(`INSERT INTO USERS VALUES('${username}', '${password}')`);
            res.status(201).send({msg: "Created user successfully"});
        }
        catch(err)
        {
            console.log(err);
        }
    };
});


module.exports = router; 