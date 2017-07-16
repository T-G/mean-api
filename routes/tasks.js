var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://oscar:pronoy@ds135552.mlab.com:35552/yelpcampv12", ['tasks']);

// LIST ALL TASKS
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err.message);
        }
        res.json(tasks);
    });
});

// DISPLAY A TASK
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err.message);
        }
        res.json(task);
    });
});

// CREATE A TASK
router.post("/task", function(req, res, next){
    var task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err) {
                res.send(err.message);
            }
            
            res.json(task);
        });
    }
})

module.exports = router;