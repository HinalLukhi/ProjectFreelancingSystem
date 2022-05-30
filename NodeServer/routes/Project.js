const express = require("express");
const connection = require("../_helpers/db");
const router = express.Router();

const { accessTokenValidator } = require("../_helpers/jwtvalidator");

router.route('/').get(accessTokenValidator, (req, res) => {
    let query = `select * from projects`
  connection.query(query, (err, result) => {
    if (err) {
      return res.send({
        msg: err.message,
      });
    }
    res.send(result);
  });
});

router.get('/:projectId', (req, res) => {
    let query = `select * from projects where project_id = ?`;

    connection.query(query, req.params.projectId, (err, result) => {
        if(err){
            return res.send({
                msg : err.message
            });
        }
        let taskQuery = `select * from task where project_id = ?`;
        connection.query(taskQuery, req.params.projectId, (tErr, tRes) => {
            if(tErr) return res.send(result);
            if(tRes) {
                result = {
                    ...result,
                    tRes
                }
            }
            res.send(result);
        });
        
    });
})
.post(accessTokenValidator, (req, res) => {
    let query = `insert into project (user_id, project_name, duration, 
        project_description, attachment, post_date, completion_date, status_id) values (?,?,?,?,?,NOW(),?,?)`;

    let data = [
        req.session.loginId,
        req.body.projectName,
        req.body.duration,
        req.body.description,
        req.body.attachment,
        req.body.completionDate,
        req.body.status
    ];

    connection.query(query, data, (err, result) => {
        if(err) return res.send({msg: err.message});

        return res.send(result);
    });


});


module.exports = router;