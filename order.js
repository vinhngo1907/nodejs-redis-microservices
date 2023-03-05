require("dotenv").config();
const express = require("express");
const app = express();

const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URI
});


app.get('/', (req, res) => {
    try {
        const order = {
            userId: 1,
            products: [
                {
                    productId: 1,
                    price: 1000,
                },
                {
                    productId: 2,
                    price: 2000,
                }
            ]
        }

        //publish to service Payment.js and sendEmail.js
        client.publish('orderSystem', JSON.stringify(order));

        res.json({
            stastus: "success",
            message: "order success!"
        });
    } catch (error) {
        console.log(error);
        req.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000")
});
