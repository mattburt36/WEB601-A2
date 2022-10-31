const { Router } = require('express');
const db = require('../database');
const router = Router();

//Add a category 
router.post('/addcategory', (req, res) =>
{
    const {categoryName, categoryDesc} = req.body;

    if(categoryName && categoryDesc)
    {
        try
        {
            db.promise().query(`INSERT INTO categoryT VALUES(NULL, '${categoryName}', '${categoryDesc}')`);
            res.status(200).send('Category created');
        }
        catch(err)
        {
            console.log(err);
            res.status(500);
        }
    }
    else
    {
        res.status(418).send('Please enter correct details');
    }
});

//Remove a category
router.delete('/removecategory', (req, res) =>
{
    const {categoryID} = req.body;

    if(categoryID)
    {
        try
        {
            db.promise().query(`DELETE FROM categoryT WHERE categoryID = '${categoryID}'`)
            res.status(200).send('Category deleted');
        }
        catch(err)
        {
            res.status(500);
        }
    }
    else
    {
        res.status(418).send('Please enter valid category ID to delete, value entered not found');
    }
});

//Search for products within category  
router.get('/searchcategory', async(req, res) =>
{
    const {categoryName} = req.body;

    if(categoryName)
    {
        try
        {
            const found = await db.promise().query(`SELECT categoryID FROM categoryT WHERE categoryName = '${categoryName}'`)

            console.log(found[0][0]);

            if((found[0][0]) && (Object.values(found[0][0]) != null))
            {
                const {categoryID} = found[0][0];

                console.log(categoryID);

                const listOfProducts = await db.promise().query(`SELECT productID, productDesc, quantity FROM productT WHERE categoryID = '${categoryID}'`)

                res.status(200).send(listOfProducts[0]);
            }
            else
            {
                res.status(418).send('Product not found');
            }
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('Server failure');
        }
    }
    else
    {
        res.status(418).send('Please enter category name to be found')
    }
});

module.exports = router; 