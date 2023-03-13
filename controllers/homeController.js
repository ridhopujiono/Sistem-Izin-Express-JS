const fire = require("./fire");
const user = require("../config/user.js");
const db = fire.firestore();

exports.index = async function (req, res, next) {
  try {
    const data = user.data.name;
    res.render("home/index", {
      data: data,
    });
  } catch (error) {
    console.error(error);
  }
};
exports.store = async function (req, res, next) {
  try {
    const data = db.collection("attendances").add({
      name: req.body.userId,
      reason: req.body.reason,
      created_at: req.body.date,
    });
    console.log(req.body.userId, req.body.reason, req.body.date);
    res.status(200).json({
      message: "Data saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
