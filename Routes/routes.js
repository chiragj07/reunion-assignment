const {Router} = require('express');
const router = Router();
const {protect} = require('../Middleware/authMiddleware');
const {addPost,deletePost, likePost, dislikePost, addComment, getOnePost, getAllPosts} = require('../Controllers/postsController');
const { registerUser, authUser, getUser, addFollower, removeFollower } = require('../Controllers/userController');

router.post('/posts', protect, addPost)
router.delete('/posts/:id',protect,deletePost)
router.post('/like/:id',protect,likePost)
router.post('/unlike/:id',protect,dislikePost)
router.post('/comment/:id', protect,addComment)
router.get('/posts/:id',protect, getOnePost)
router.get('/all_posts', protect, getAllPosts);
router.post('/adduser', registerUser);
router.post('/authenticate', authUser);
router.get('/user', protect, getUser)
router.post('/follow/:id',protect, addFollower)
router.post('/unfollow/:id',protect, removeFollower)


module.exports = router