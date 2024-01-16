const express = require('express');
const SubscriptionUser = require('../model/subscriptionSchema');
const subscriptionRouter = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// signup subscription user 
subscriptionRouter.post('/user/signup', async (req, res) => {
    const { name, email, password, phone, country, city, address, packages } = req.body
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
                packages,
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
                    message: 'User not found'
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



// get subscription data 

subscriptionRouter.get('/user', async (req, res) => {
    try {
        const result = await SubscriptionUser.find().populate('packages');
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
            })
        } else {
            res.status(404).json({
                message: 'User not found'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


// login subscription user
subscriptionRouter.post('/user/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExistUser = await SubscriptionUser.find({ email: email });
        if (isExistUser) {
            const isValidPassword = await bcrypt.compare(password, isExistUser[0].password);
            if (isValidPassword) {
                let token = jwt.sign({
                    name: isExistUser[0].name,
                    email: isExistUser[0].email
                }, process.env.PRIVATE_KEY, { expiresIn: '1h' });

                res.status(200).json({
                    access_token: token,
                    user: {
                        name: isExistUser[0].name,
                        email: isExistUser[0].email
                    }
                })
            } else {
                res.status(404).json({
                    message: 'Password incorrect'
                });
            }
        } else {
            res.status(404).json({
                message: 'Email not valid'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

module.exports = {
    subscriptionRouter
}