const fire = require("./fire");
const db = fire.firestore();
const key = require("../config/secretKey.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  res.render("admin/login");
};

exports.authenticate = (req, res) => {
  let { username, password } = req.body;
  if (!username && !password) {
    res.status(403).json({
      message: "Username or password must be provided",
    });
  } else {
    let admin = [];
    db.collection("admin")
      .get()
      .then((snapshot) => {
        snapshot.forEach((hasil) => {
          admin.push(hasil.data());
        });
        const password_check = bcrypt.compareSync(password, admin[0].password);
        if (admin[0].username == username && password_check) {
          const token = jwt.sign(
            {
              username: admin[0].username,
            },
            key.key
          );
          res.status(200).json({
            status: 200,
            message: "logged in successfully",
            token: token,
          });
        } else {
          res.status(401).json({
            status: 401,
            message: "Invalid credentials",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
exports.dashboard = async (req, res) => {
  // Get a reference to the Firestore collection
  const collectionRef = db.collection("attendances");

  // Now
  let nowData = [];
  const query = collectionRef.where(
    "created_at",
    "==",
    new Date().toLocaleDateString("en-CA")
  );

  // Execute the query and log the results
  const getNowData = await query.get();

  // Loop through the getNowData and add each document to the data array
  getNowData.forEach((doc) => {
    nowData.push(doc.data());
  });
  res.render("admin/main/index", {
    nowData: nowData,
  });
};

exports.getByDate = async function (req, res, next) {
  const { date } = req.body;

  // Get a reference to the Firestore collection
  const collectionRef = db.collection("attendances");

  // Now
  let nowData = [];
  const query = collectionRef.where("created_at", "==", date);

  // Execute the query and log the results
  const getNowData = await query.get();

  // Loop through the getNowData and add each document to the data array
  getNowData.forEach((doc) => {
    nowData.push(doc.data());
  });

  res.status(200).json({
    message: "OK",
    data: nowData,
  });
};

exports.isAdmin = (req, res, next) => {
  if (typeof req.cookies._token != "undefined") {
    const _token = req.cookies._token;
    const decoded = jwt.verify(_token, key.key);
    if (decoded) {
      let admin = [];
      db.collection("admin")
        .get()
        .then((snapshot) => {
          snapshot.forEach((hasil) => {
            admin.push(hasil.data());
          });
          if (admin[0].username == decoded.username) {
            next();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.redirect("/auth", {
        error: true,
      });
    }
  } else {
    res.redirect("/auth");
  }
};
