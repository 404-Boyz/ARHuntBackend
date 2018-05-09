const router = require('express').Router()
const User = require('../db/models/user')

module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({
    where: { userName: req.body.userName },
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
      console.log('SESSION', req.session.passport.user, 'REQ.USER: ', req.user);
      return { user, session: req.session.passport.user }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  console.log('HIT IT!!!! Incoming object: ', req.body)
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
      return user
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  console.log('LOGGING OUT!')
  req.logout();
  req.session.destroy();
  console.log('LOGGED OUT: ', req.user)
  //  from throwback do we need this?
  // res.clearCookie('cartId').redirect('/');
})

router.use('/google', require('./google'));
