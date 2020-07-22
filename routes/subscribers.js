const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//get all
router.get('/',async (req,res) => {
    try{
        const subscriber = await Subscriber.find();
        res.send(subscriber)
    } catch (err){
        res.status(500).json({message:err.message})
    }
})
//get one
router.get('/:id',getSubscriber,(req,res) => {
    res.send(res.subscriber)
});
//create one
router.post('/',async (req,res) => {
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribeToChanel:req.body.subscribeToChanel
    })
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (err){
        res.status(400).json({message:err.message})
    }
})
//update one
router.patch('/:id',getSubscriber,async (req,res) => {
   if(req.body.name != null) {
    res.subscriber.name = req.body.name;
   }
   if(req.body.subscribeToChanel != null) {
    res.subscriber.subscribeToChanel = req.body.subscribeToChanel;
   }
   try{
    const updatedSubscriber = await res.subscriber.save();
    express.json(updatedSubscriber)
   } catch (err){
    res.status(400).json({msg : err.msg})
   }
});
//delete one
router.delete('/:id',async (req,res) => {
    try{
        await res.subscriber.remove();
        res.json({msg: 'Deleted Subscribe'})
    } catch (err){
        res.status(500).json({msg : err.msg})
    }
});

async function getSubscriber(req,res,next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(400).json({msg:'Cant find subscriber'})
        }
    } catch (err){
        return res.status(500).json({msg:err.msg})
    }
    res.subscriber = subscriber;
    next()
}




module.exports = router;
