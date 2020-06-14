const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    locationName = req.body.name
    userId = req.session.passport.user
    const users = await User.One({
      where: {
        id: userId
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
