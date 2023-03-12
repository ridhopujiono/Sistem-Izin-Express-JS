const admin = require("firebase-admin");
const serviceAccount = require("../config/fswd-60634-firebase-adminsdk-5zml1-06cbad5199.json");
const fire = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
module.exports = fire