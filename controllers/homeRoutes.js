const router = require('express').Router();
const { Comment, Post, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['content', 'date']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
     const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [ { model: Comment}, {model: Post} ],
     });

     const user = userData.get({ plain: true });

     res.render('profile', {
        ...user,
        logged_in: true
     });
     
    } catch (err) {
     res.status(500).json(err);
    } 
 });

 module.exports = router;