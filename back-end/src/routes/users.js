const express = require('express');
const router = express.Router();
const {
  getProfile,
  getSavedRoutes,
  addSavedRoute,
  deleteSavedRoute,
} = require('../controllers/userController');

/**
 * @route GET /api/users/:userId/profile
 * @description Retrieves the profile information for a specified user.
 */
router.get('/:userId/profile', getProfile);

/**
 * @route GET /api/users/:userId/saved-routes
 * @description Fetches all saved routes for a specified user.
 */
router.get('/:userId/saved-routes', getSavedRoutes);

/**
 * @route POST /api/users/:userId/saved-routes
 * @description Adds a new saved route for a specified user.
 */
router.post('/:userId/saved-routes', addSavedRoute);

/**
 * @route DELETE /api/users/:userId/saved-routes/:routeId
 * @description Deletes a specified saved route for a user.
 */
router.delete('/:userId/saved-routes/:routeId', deleteSavedRoute);

module.exports = router;
