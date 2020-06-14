const router = require('express').Router()
const {User, Alert} = require('../db/models')
module.exports = router

//checks for current "pending" status
router.get('/:userId', async (req, res, next) => {
  try {
    const id = req.session.passport.user
    const currentUser = await User.findByPk(id)
    const alert = await currentUser.getAlerts({
      where: {status: 'pending'}
    })
    res.json(alert)
  } catch (err) {
    next(err)
  }
})

//new alert post to database if there is not one currently pending
router.post('/:userId', async (req, res, next) => {
  try {
    const newAlert = await Alert.create({
      userId: req.params.userId,
      location: req.body.location
    })
    res.json(newAlert)
  } catch (err) {
    next(err)
  }
})
