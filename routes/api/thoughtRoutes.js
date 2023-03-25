const router = require('express').Router();
const {
  getAllThoughts,
  createThought,
  getThoughtsById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,


} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtsById).put(updateThought).delete(deleteThought);

// /api/thoughts/thoughtId/reactions/zx:ReactionId
router.route('/:thoughtId/reaction/:reactionId').post(addReaction).delete(deleteReaction);

module.exports = router;