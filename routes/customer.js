const { Router } = require('express');
const db = require('../database');
const router = Router();

//Login 
router.get('/login', async(req, res) =>
{
    //Deconstruct email and password 
    const {customerEmail, customerPassword} = req.body;

    //Check email and password were entered correctly 
    if(customerEmail && customerPassword)
    {
        //Query DB
        const found = await db.promise().query(`SELECT customerID FROM customerT WHERE customerEmail= '${customerEmail}' and customerPassword = '${customerPassword}'`);    

        //Check the customerID exists and is more than 0
        if((found[0][0]) && (Object.values(found[0][0]) > 0))
        {
            //destruct customerID            
            const {customerID} = found[0][0]; 
            
            //Send successful state and message 
            res.status(200).send('Successfully logged in');
            try
            {
                //Create a session 
                db.promise().query(`INSERT INTO sessionT VALUES(NULL, '${customerID}', NULL, NULL)`);
            }
            catch(err)
            {
                res.status(418).send('Server update failure')
                console.log(err);
            }
        }
        else
        {
            //Send unsuccessful state and message 
            res.status(404).send('Not Found');
        }
    }
    else
    {
        //Send unsuccessful state and message 
        res.status(400).send("Incorrect details entered");
    }
});

//Register
router.post('/register', (req, res) => 
{
    //Recieve the values to be inserted 
    const {customerFirstName, customerEmail, customerPassword, address} = req.body; 
    //Check the values are all present 
    if(customerFirstName && customerEmail && customerPassword && address)
    {
        try
        {
            //Insert into the database, ID column set to NULL to auto increment and generate ID 
            db.promise().query(`INSERT INTO customerT VALUES(NULL, '${customerFirstName}', '${customerEmail}', '${customerPassword}','${address}')`);
            //Set status to 'Created' and send back a successful message 
            res.status(201).send("Created user successfully");
        }
        catch(err)
        {
            //Catch any errors
            res.status(418).send('Server update failure')
            console.log(err);
        }
    };
});

//Edit account details 
router.post('/editacc', (req, res) => 
{
    const {customerID, customerFirstName, customerEmail, customerPassword, address} = req.body;
    if(customerID && customerFirstName && customerEmail && customerPassword && address)
    {
        try
        {
            db.promise().query(`UPDATE customerT SET customerFirstName = '${customerFirstName}', customerEmail = '${customerEmail}', customerPassword = '${customerPassword}', address = '${address}' WHERE customerID = '${customerID}'`);
        }
        catch(err)
        {
            res.status(418).send('Server update failure');
            console.log(err);
        }
    }
    else
    {
        res.status(400).send('Please enter; name, email, password, address');
    }
});

//Remove account
router.post('/removeacc', async(req, res) =>
{
    const {customerID} = req.body; 
    const found = await db.promise().query(`SELECT customerEmail FROM customerT WHERE customerID = '${customerID}'`);   

    if((found[0][0]) && (Object.values(found[0][0]) != null))
    {
        db.promise().query(`DELETE FROM customerT WHERE customerID = '${customerID}'`);
    }
    else
    {
        res.status(400).send('Please enter ID to delete');
    }
});
module.exports = router; 