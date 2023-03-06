const User = require('../models/User');
const Thought = require('../models/Thought');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET a single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  // PUT to update a thought by its _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        // remove the thought id from the associated user's `thoughts` field
        return User.findOneAndUpdate(
          { _id: thoughtData.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: 'Thought deleted!' });
      })
      .catch(err => res.status(400).json(err));
  },

  // POST to create a reaction stored in a single thought's reactions array field
  // POST to create a reaction stored in a single thought's reactions array field
createReaction({ params, body }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $push: { reactions: body } },
    { new: true, runValidators: true }
  )
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thoughtData);
    })
    .catch(err => res.status(400).json(err));
},

            
deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then(thoughtData => {
      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json({ message: 'Reaction deleted!' });
    })
    .catch(err => res.status(400).json(err));
},
};

module.exports = thoughtController;


