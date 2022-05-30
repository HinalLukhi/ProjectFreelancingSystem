const express = require("express");
const connection = require("../_helpers/db");
const router = express.Router();

const { accessTokenValidator } = require("../_helpers/jwtvalidator");

router.route("/:userId?").get(accessTokenValidator, (req, res, next) => {
    
  let query = req.params.userId ? `select * from userprofile where user_id = ${req.params.userId}`:
   `select p.*, l.login_id, l.user_type_id from userprofile p, logininfo l where p.login_id = l.login_id AND l.user_type_id = 2`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.send({
        msg: err.message,
      });
    }
    res.send(result);
  });
}).post(accessTokenValidator, (req, res) => {
    let query = "insert into userprofile (login_id, profile_image, hourly_rate, tag_line, city_id, mobile_no, first_name, last_name) values (?,?,?,?,?,?,?,?)";
    let data = [
        req.session.loginId, 
        req.body.path, 
        req.body.img,
        req.body.rate,
        req.body.tagLine,
        req.body.city,
        req.body.mobile,
        req.body.firstName,
        req.body.lastName
    ];

    connection.query(query, data, (err, result) => {
        if(err) {
            return res.send({
                msg: err.message
            });
        }

        res.send(result);
    });
});

router.get('/fetch/:userName?', (req, res)=>{
    let query = `select * from userprofile where first_name like \'${req.params.userName}%\'`;
    connection.query(query, (err, result) => {
        if (err) {
          return res.send({
            msg: err.message,
          });
        }
        res.send(result);
      });
});
module.exports = router;
