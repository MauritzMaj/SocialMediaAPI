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
createThought({params, body}, res) {
    Thought.create(body)
    .then(({_id}) => {
        return User.findOneAndUpdate(
            { _id: params.userId}, 
            {$addToSet: {thought: _id}}, 
            {new: true}
            );
    })
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err)); 
},

//update thought
updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
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
deleteThought({params}, res) {
    Thought.findOneAndDelete({_id: params.id})
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
getThoughtsById({params}, res) {
    Thought.findOne({ _id: params.id })
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

addReaction({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
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
deleteReaction({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId}, 
        {$pull: {reaction: {reactionId: params.reactionId}}}, 
        {new : true})
        
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
}


};