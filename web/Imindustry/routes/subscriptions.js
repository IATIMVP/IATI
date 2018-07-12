const express = require('express');
const chargeRoutes = express.Router();
var subscriptions = require('./../controllers/subscription');


chargeRoutes.get('/ChargeSubscribers', (req, res) => {
    subscriptions.ChargeSubscribers(req, res);
})

module.exports = chargeRoutes;