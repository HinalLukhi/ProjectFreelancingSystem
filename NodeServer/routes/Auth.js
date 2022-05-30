const {json} = require('express');
const express = require('express');
const app = express();
app.use(express.json());
//const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const urlEncodedParser = bodyParser.urlencoded({extended:false});
const connection = require('../_helpers/db');
const { loginValidation } = require('../_helpers/validation');
const jwt = require('jsonwebtoken');

router.post('/login', loginValidation, (req, res, next) => {
    let query = "select login.login_id, login.password,user.user_type from logininfo as login ,usertype as user where login.user_type_id=user.user_type_id AND login.email = ?";
    connection.query(query, [req.body.email], (error, result) => {
        if (error) {
            res.status(500);
            return res.json({data : "Error : " + error});
        }
        if(!result.length) {
            res.status(401);
            return res.json({data : "Invalid username."});
        }
        let userProfile;
        connection.query(`select * from userprofile where login_id = ?`, result[0].login_id, (pErr, pData) => {
                    if(pData) userProfile = pData;
        });
        let userType =result[0].user_type;
        bcrypt.compare(req.body.password, result[0].password, (err, data) => {
           
            if(data) {
                req.session.loginId = result[0].login_id;
                const token = jwt.sign({id: result[0].login_id}, process.env.secret, {expiresIn: '1d'});
                connection.query(`UPDATE logininfo SET last_login = NOW() WHERE login_id = '${result[0].login_id}'`);
                return res.status(200).send({
                    msg: 'Logged in!',
                    token,
                    user: userProfile,
                    userType : userType
                  });
            }
            return res.json({data : "Incorrect Password."});
        });
    });
});


router.post('/register', urlEncodedParser, (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        let query = "insert into logininfo(email, password, user_type_id,status_id) values(?,?,?,?)";
        connection.query(query, [req.body.email, hashedPassword, req.body.usrtype, req.body.status], (err, result)=>{
            if (err)  throw err;
            return res.json({data : "Record Inserted."});
        });
    });

});



module.exports = router;