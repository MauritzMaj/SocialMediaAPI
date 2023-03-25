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

// /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;