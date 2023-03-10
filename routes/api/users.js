const router = require("express").Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	deleteUser,
	updateUser,
	addFriend,
	deleteFriend,
} = require("../../controllers/user-controller.js");

//post route /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getUserById).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);


module.exports = router;