const express = require("express");
const connection = require("../_helpers/db");
const router = express.Router();

const { accessTokenValidator } = require("../_helpers/jwtvalidator");

router.route('/:taskId?').get(accessTokenValidator, (req, res) => {
    let query = req.params.taskId ?
     `select * from task where task_id = ${req.params.taskId}` :
     `select * from task`;

    connection.query(query, (err, result) => {
        if(err) return res.status.apply(400).send({msg: err.message});

        return res.status(200).send(result);
    })
})
.post(accessTokenValidator, (req, res) => {
    let query = `insert into task (project_id, task_name, task_description, start_date,
        end_date, attachment, post_date, payment_status, min_budget, max_budget, status_id)
        values (?,?,?,?,?,?,NOW(),9,?,?,5)`;

        let data = [
            req.body.projectId,
            req.body.taskName,
            req.body.description,
            req.body.startDate,
            req.body.endDate,
            req.body.attachment,
            req.body.minBudget,
            req.body.maxBudget,
        ];

        connection.query(query, data, (err, result) => {
            if(err) return res.status(400).send({msg: err.message});

            return res.status(201).send(result);
        });
});



module.exports = router;