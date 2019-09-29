const User = require('../models/guessTheWord.model.js');
const Quiz = require('../models/quiz.model.js');
const Groups = require('../models/groups.model.js');
var jwt = require('jwt-simple');
const config = require('../constants/config')
exports.User = {
    create : (req, res) => {
        // Validate request
      
        if(!req.body) {
            return res.status(400).send({
                message: "User can not be empty"
            });
        }
        // Create a Note
        const user = new User({
            uname: req.body.uname || "Untitled", 
            email: req.body.email,
            extraInfo: req.body.extraInfo
        });
    
        const payload = {
            email: req.body.email
        }
        // encode
        const token = jwt.encode(payload, config.JWT_SECRET);
        // Save Note in the database
        user.save()
        .then(data => {
            res.send({data: data, token:token});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "   Some error occurred while creating the Note."
            });
        });
    }
}

exports.Quiz = {
get : (req, res, cb) => {
    if(!req.headers.authorization){
        res.status(500).send({
            message: "Token is missing"
        });  
        return; 
    }
    const token = jwt.decode(req.headers.authorization, config.JWT_SECRET);
    User.find({email: token.email}).then((data) =>{
        if(data.length){
            Quiz.find({}).then(notes => {
                 cb(notes, req.body.quizId, req.body.groupId)
                res.send(notes[req.body.quizId]);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving data."
                });
            });
        }else{
            res.status(500).send({
                message: "Some error occurred while retrieving data."
            });
        }
    })
  }
}

exports.Groups = {
    get : (req, res) => {
        if(!req.headers.authorization){
            res.status(500).send({
                message: "Token is missing"
            });  
            return; 
        }
        const token = jwt.decode(req.headers.authorization, config.JWT_SECRET);
        User.find({email: token.email}).then((data) =>{
            if(data.length){
                Groups.find({}).then(notes => {
                    res.send(notes);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving data."
                    });
                });
            }else{
                res.status(500).send({
                    message: "Some error occurred while retrieving data."
                });
            }
        })
      }
    }