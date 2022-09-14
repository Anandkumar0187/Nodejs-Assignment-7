const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');
const { isNullOrUndefined } = require('mongoose/lib/utils');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get('/mario',async(req,res)=>{
    const data = await marioModel.find();

    res.status(201).json({data})
})
app.get('/mario/:id',async (req,res)=>{
    try{
        const data = await marioModel.find({"_id": req.params.id});
        res.status(201).json({
            data
        })
    }
    catch(error){
        res.status(400).json({
            message : error.message
        })
    }
})
app.post('/mario',async (req,res)=>{
    try{
        if(isNullOrUndefined(req.body.name) || isNaN(req.body.weight) || isNullOrUndefined(req.body.weight)){
            res.status(400).json({ 
                message : 'either name or weight is missing'
            })
        }
        else{
            const data = await marioModel.create(req.body);
            res.status(201).json({
                data
            })
        }
    }
    catch(error){
        res.status(400).json({
            message : error.message
        })
    }
})
app.patch('/mario/:id',async (req,res)=>{
    try{
        const data = await marioModel.updateOne({"_id": req.params.id},{"weight":req.body.weight});
        res.status(201).json({
            data
        })
    }
    catch(error){
        res.status(400).json({
            message : error.message
        })
    }
})
app.delete('/mario/:id',async (req,res)=>{
    try{
        const data = await marioModel.deleteOne({"_id": req.params.id});
        res.status(201).json({
            data
        })
    }
    catch(error){
        res.status(400).json({
            message : error.message
        })
    }
})

module.exports = app;