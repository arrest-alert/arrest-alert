const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'fullName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userUpdate = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    console.log('express req.body=>', req.body)
    const updateUser = await userUpdate.update(req.body)
    res.json(updateUser)
  } catch (error) {
    next(error)
  }
})
