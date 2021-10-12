const express = require('express');
const userRoutes = require('./routes/userRoutes');
const couponRoutes = require('./routes/couponRoutes');
const router = express.Router();

//router.use(express.json());
router.use('/user', userRoutes);
router.use('/coupon',couponRoutes);



module.exports = router;