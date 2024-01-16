const express = require('express');
const Package = require('../model/packageSchema');
const packageRouter = express();


packageRouter.post('/', async (req, res) => {
    try {
        const package = await Package({ ...req.body });
        const result = await package.save();
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
            })
        } else {
            res.status(404).json({
                message: 'Package not uploaded'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});


// get package data 

packageRouter.get('/', async (req, res) => {
    try {
        const result = await Package.find();
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
            })
        } else {
            res.status(404).json({
                message: 'package not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})



module.exports = packageRouter;