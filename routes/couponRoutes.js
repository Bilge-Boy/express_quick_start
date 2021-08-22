const express = require('express');
const router = express.Router();
const couponServ = require('../services/couponService');
const { route } = require('./userRoutes');


router.get('/', (req,res)=>{
    res.send(couponServ.getAll());
});

router.post('/', (req,res)=>{
    const coupon = req.body;
    const condition = couponServ.addCoupon(coupon);
    if(condition){
        res.status(201).send("coupon added successfuly");
    }
    else{
        res.status(203).send('failed, check the coupon format');
    }
})

router.get('/:code',(req,res)=>{
    const coupon = couponServ.getCoupon(req.params.code);
    if(!coupon)
        {res.status(404).send();}
    else
        {res.send(coupon);}
})

router.put('/:code',(req,res)=>{
    const coupon = couponServ.updateCoupon(req.body,req.params.code);
    if(!coupon){
        res.status(201).send("updated successfully");
    }
    else{
        res.status(404).send("user not found");
    }
})

router.delete('/:code', (req,res)=>{
    const isDeleted = couponServ.deleteCoupon(req.params.code);
    
    if(!isDeleted) res.send("deleted successfully");
    else res.send("something went wrong");
})


router.post('/:code/redeem', (req,res) =>{
    const final = couponServ.redeemCoupon(req.params.code);
    if(!final){
        res.status(400).send('coupon already used or not exists!');
    }
    else {
        res.status(200).send('coupon is used successfully');
    }
})

router.get('/search/:code', (req,res) => {
    if(couponServ.exists(req.params.code)){
        res.status(200).send("coupon exists!");
    }
    else {
        res.status(404).send('Not Found');
    }
})




module.exports = router;