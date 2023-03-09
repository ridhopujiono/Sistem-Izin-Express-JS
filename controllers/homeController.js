const express = require('express');
const {User, Attendance} = require('../models');
exports.index = async function (req, res, next) {
    try {
        const data =  await User.findAll();
        res.render('home', {
            data: data
        })
    } catch (error) {
        console.error(error)
    }
}
exports.store = async function (req, res, next) {
    try {
        const {date, userId, reason} = req.body;
        const saveData = await Attendance.create({
            userId: userId,
            permitOn: date,
            reason: reason
        });
        res.status(200).json({
            message: "Data saved successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}