const { Router } = require('express')
const passport = require('passport')
const KEYS = require('../configs/keys');

// iTo initialize router
let router = Router()

router.get('/login', (req, res) => {
    // check authentication to redirect to relavant page
    if (req.user) res.redirect('/dashboard')
    else res.redirect('/auth/login/google')
})

// google auth redirect
router.get('/login/google', passport.authenticate("google", {
    scope: ['profile', KEYS.scope_option, "email"]
}))

// callback from google oauth (with token)
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard')
})

// sign out from google auth
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})

module.exports = router