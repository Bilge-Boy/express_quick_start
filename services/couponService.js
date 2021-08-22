const e = require('express');
const fs = require('fs');
const validation = require('./validation');


const getAll = () => {
    return JSON.parse(fs.readFileSync('db/coupon.json'));
}

const validCode = (code) => {
    return code.length === 6 && validation.Integer.test(code);
}
const validDate = (date) => {
    return validation.Date.test(date);
}

const setCoupons = (coupons) =>{
    fs.writeFileSync('db/coupon.json', JSON.stringify(coupons));
}

const addCoupon = (newCoupon) => {
    let coupon = getAll();
    let condition =false;
    if(validCode(newCoupon.code) && validDate(newCoupon.date) && newCoupon.isRedeem){
        coupon = [...coupon, {
            code: newCoupon.code,
            date: newCoupon.date,
            isRedeem: newCoupon.isRedeem
        }];
        setCoupons(coupon);
        condition =  true;
    }
    return condition;
}

const getCoupon = (code) => {
    const coupons = getAll();
    const foundCoupon = coupons.find(coupon => coupon.code === code);
    return foundCoupon;
}

const updateCoupon = (newCoupon, code) => {
    const coupons = getAll();
    const foundCoupon = coupons.find(coupon => coupon.code === code);
    if(!foundCoupon) return false;
    Object.keys(foundCoupon).forEach((key)=> {if(newCoupon[key]) foundCoupon[key] = newCoupon[key]});
    setCoupons(coupons);
}

const deleteCoupon = (code) => {
    const coupons = getAll();
    if(validCode(code)){
        const filterdCoup = coupons.filter((coupon)=>coupon.code !== code);
        setCoupons(filterdCoup);
        return true;
    }
    else return false;
}

const redeemCoupon = (code) =>{
    const coupon = getCoupon(code);
    if(coupon){
        if(coupon.isRedeem === 'false'){
            updateCoupon({isRedeem:'true'},coupon.code);
            return true;
        }
    }
    else return false;
}

const exists = (code) =>{
    const flag = getCoupon(code);
    if(flag){
        return true;
    } return false;

}

module.exports ={
    getAll,
    setCoupons,
    addCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
    redeemCoupon,
    exists
}




















//updateCoupon(, "123456");
//deleteCoupon("111111");
//console.log(getAll());




