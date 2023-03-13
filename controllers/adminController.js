const fire = require('./fire')
const db = fire.firestore();
const privateKey = require('../config/jwt.js');
const jwt = require('jsonwebtoken');

exports.login = (req, res) =>{
    res.render('admin/login');
}

exports.authenticate = (req, res)=> {
    let {username, password} = res.body;
    if(!username && !password){
        res.status(403).json({
            message: 'Username or password must be provided'
        })
    }else{
        db.settings({
            timestampsInSnapshots: true
        })
        let admin = []
        db.collection('admin').get()
        .then(snapshot => {
            snapshot.forEach((hasil)=>{
                admin.push(hasil.data())
            });
            if(admin[0].username == username && admin[0].password == password){
                console.log("masuk")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}