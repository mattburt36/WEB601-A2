const { Router } = require('express');
const db = require('../database');
const router = Router();

//Add a product 
router.post('/addproduct', (req, res) => 
{
    const { productName, categoryID, quantity, price } = req.body; 

    if(productName, categoryID, quantity, price)
    {
        try
        {
            db.promise().query(`INSERT INTO productT VALUES(null, '${productName}', '${categoryID}', '${quantity}', '${price}')`);
            res.status(200).send('Product successfully added');
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('Server error');
        }
    }
    else
    {
        res.status(418).send('Incorrect values entered');
    }
});

//Remove a product 
router.delete('/removeproduct', async(req, res) =>
{
    const { productID } = req.body; 

    const found = await db.promise().query(`SELECT productName FROM productT WHERE productID = '${productID}'`);

    if((found[0][0]) && (Object.values(found[0][0]) != null))
    {
        if(productID)
        {
            try
            {
                db.promise().query(`DELETE FROM productT WHERE productID = '${productID}'`);
                res.status(200).send('Product successfully deleted');
            }
            catch(err)
            {
                console.log(err);
                res.status(500).send('Server error');
            }
        }
        else
        {
            res.status(418).send('Incorrect values entered');
        }
    }
    else
    {
        res.status(404).send('Product not found');
    }
});

//Search for a product 
router.get('/searchproduct', async(req, res) => 
{
    const {productName} = req.body;

    if (productName)
    {
        const found = await db.promise().query(`SELECT productID, productName, categoryID, quantity, price FROM productT WHERE productName = '${productName}'`);

        if((found[0][0]) && (Object.values(found[0][0]) != null))
        {
            const product = found[0][0];

            res.status(200).json(product);
        }
        else
        {
            res.status(404).send('Not found')
        }
    }
    else
    {
        res.status(418).send('Please enter a product name to search, none found');
    }
});
//Add a product to cart 
router.post('/addproducttocart', async(req, res) => 
{
    const {customerID, productID} = req.body; 

    if(customerID, productID)
    {
        //Check customer isn't already assigned a cart 
        const found = await db.promise().query(`SELECT cartID FROM cartT WHERE customerID = '${customerID}'`);

        if((found[0][0]) && (Object.values(found[0][0] != null)))
        {
            const {cartID} = found[0][0];
            //Add value to a cart with ID of cart that has been assigned to the customer 
            db.promise().query(`INSERT INTO cartT VALUES('${cartID}', '${customerID}', '${productID}')`);
        }
        else
        {
            //Add value to a cart with new ID 
            db.promise().query(`INSERT INTO cartT VALUES(null, '${customerID}', '${productID}')`);
        }
    } 
});

module.exports = router;