const { Router } = require('express');
const db = require('../database');
const router = Router();

//Place order/checkout 
router.post('/placeorder', (req, res) =>
{
    const {customerID, productID, trackingID} = req.body;

    const date = new Date();

    if(customerID && productID && trackingID)
    {
        try
        {
            db.promise().query(`INSERT INTO orderT VALUES(null, '${customerID}', '${productID}', '${trackingID}', '${date}')`);
            res.status(200).send('Order placed');
        }
        catch(err)
        {
            res.status(500).send('Server error');
        }
    }
    else
    {
        res.status(418).send('Incorrect details entered');
    }
});

//Cancel an order 
router.delete('/cancelorder', (req, res) =>
{
    const {orderID, customerID, cartID} = req.body; 

    if(orderID && customerID && cartID)
    {
        try
        {
            db.promise().query(`DELETE FROM orderT WHERE orderID = '${orderID}'`);
            db.promise().query(`DELETE FROM cartT WHERE cartID = '${cartID}'`);
            res.status(200).send('Order cancelled');
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('Server error');
        }
    }
    else
    {
        res.status(418).send('Incorrect fields entered');
    }
});

//Check order status/retrieve tracking number 
router.get('/checkorder', async(req, res) =>
{
    const {customerID} = req.body;

    if(customerID)
    {
        const found = await db.promise().query(`SELECT trackingID FROM orderT WHERE customerID = '${customerID}'`);

        if((found[0][0]) && (Object.values(found[0][0]) != null))
        {
            const {trackingID} = found[0][0];
            res.status(200).json(trackingID);
        }
        else
        {
            res.status(404).send('Not found');
        }
    }
    else
    {
        res.status(418).send('Incorrect details entered');
    }
});
module.exports = router;