const express = require('express')

const allowCors = async (req, res, next) => {
    // Enabling CORs
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
    next()
}

module.exports = {
    allowCors: allowCors
}