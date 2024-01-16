const express = require('express');
const SubscriptionUser = require('../model/subscriptionSchema');
const subscriptionRouter = express();
const bcrypt = require('bcrypt');


subscriptionRouter.post('/user', async (req, res) => {
    const { name, email, password, phone, country, city, address } = req.body
    try {
        const isExist = await SubscriptionUser.findOne({ email: email });
        if (!isExist) {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new SubscriptionUser({
                name,
                email,
                phone,
                country,
                city,
                address,
                password: hashPassword,
            });
            const result = await user.save();
            if (result) {
                res.status(200).json({
                    message: 'Signup Successfull',
                    data: result,
                })
            } else {
                res.status(404).json({
                    message: error.message
                })
            }
        } else {
            res.status(404).json({
                message: 'User Already Exist',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})



// subscriptionRouter.get('/', async (req, res) => {
//     res.json({
//         name: 'Adnan Hossain'
//     })
// })

module.exports = {
    subscriptionRouter
}