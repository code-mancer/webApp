const express = require('express');

const handleResponse = (res, status, data) => {
    return res.status(status).json(data);
};

module.exports = { handleResponse };