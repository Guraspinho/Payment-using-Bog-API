const axios = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const clientId = process.env.BOG_CLIENT_ID; 
const secretKey = process.env.BOG_SECRET_KEY; 

const token = jwt.sign({ clientId }, secretKey, { expiresIn: '1h' });


const data = {
    callback_url: "http://localhost:5000/callback",
    external_order_id: "id123",
    purchase_units:
    {
        currency: "USD",
        total_amount: 1,
        basket:
        [
            {
                quantity: 1,
                unit_price: 1,
                product_id: "product123"
            }
        ]
    },
    redirect_urls:
    {
        fail: "http://localhost:5000/fail",
        success: "http://localhost:5000/succes"
    }
};




router.post('/order', async (req, res) =>
    {
        try
        {
            const response = await axios.post('https://api.bog.ge/payments/v1/ecommerce/orders', data,
            {
                headers:
                {
                    'Accept-Language': 'ka',
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const responseData = response.data;
            res.send(responseData);
        }
        catch (error)
        {
            console.error(error);
        }

    });





module.exports = router;