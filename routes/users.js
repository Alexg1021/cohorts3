var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


router.param('userId', function(req, res, next, userId){

    User.findById(userId, function (err, user){
        if (err) return res.sendStatus(404);
        req.user = user;
        next();
    })

});

/* GET users listing. */
router.get('/', function(req, res) {
    console.log('GETTING ALL USERS');
    User.find(function (err, users){
        console.log('ERROR: ', err);
        console.log('USERS: ', users);
        res.json(users);
    });
});


router.put('/:userId', function(req, res){
    req.user.update({$set: req.body}, {new: true}, function(err, user){
        res.sendStatus(200);
    });

});

router.post('/', function(req, res){
    var user = new User(req.body);
    user.save(function(err){
       res.json(user);
    });
});

router.get('/email', function(req, res) {

});



module.exports = router;
