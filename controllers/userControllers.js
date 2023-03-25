const { User} = require('../models');


module.exports= {

    //Get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //Get user by ID
    getUserById(req, res) {
        User.findOne({_id: req.params.userId })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return; 
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //Create a new user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //Update user by ID
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
    //Delete user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$push: { friends: req.params.friendId}}, 
            {new: true})

        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
        res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

      //Delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$pull: { friends: req.params.friendId}}, 
            {new: true})
            
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }

};