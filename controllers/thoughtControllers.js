const { User, Thought } = require('../models');

module.exports ={

//Get all thoughts
getAllThoughts(req,res) {
    Thought.find({})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},


//Create thought
createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            { _id: body.userId}, 
            {$addToSet: {thought: thought._id}}, 
            {new: true}
            );
    })
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err)); 
},

//update thought
updateThought(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId}, 
        {$set: req.body},
        {new: true, runValidators: true})

    .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
            res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
},

//Delete thought
deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
},


//Get thought by ID
getThoughtsById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .populate({path: 'reactions',select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
        res.status(404).json({message: 'No thought with this particular ID!'});
        return;
    }
    res.json(dbThoughtsData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},

//Add a reaction

addReaction(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId}, 
        {$push: {reactions: req.body}}, 
        {new: true, runValidators: true})

    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
    if (!dbThoughtsData) {
        res.status(404).json({message: 'No thoughts with this particular ID!'});
        return;
    }
    res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))

},

//Delete a reaction
deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId},
      {$pull: {reactions: { _id: req.params.reactionId}}},
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


};