const router = require('express').Router()
const {userAuth, checkRole, serializeUser} = require('../controllers/auth')
const {ROLE} = require('../config/roles')
const passport = require('passport')

router.get('/', (req, res) => {
  res.send('Api running...')
})

// Authentication Router Middleware
router.use('/auth', require('./auth'))

// Admin Protected Route
router.use('/admin', userAuth, checkRole([ROLE.admin]), require('./admin'))

// Admin & Operator Protected Route
router.use(
  '/patients',
  userAuth,
  checkRole([ROLE.admin, ROLE.operator]),
  require('./patients')
)

// Admin & Operator Protected Route
router.use('/menu', require('./menu'))

router.use('/roles', userAuth, checkRole([ROLE.admin]), require('./roles'))

// Users Protected Route
router.get('/profile', userAuth, checkRole([ROLE.user]), async (req, res) => {
  res.status(200).json({type: ROLE.user, user: serializeUser(req.user)})
})

module.exports = router
