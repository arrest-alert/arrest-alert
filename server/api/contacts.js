const router = require('express').Router()
const {User, Contact} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({
      attributes: ['contactName', 'number', 'message', 'id'],
      where: {
        userId: req.params.userId
      }
    })
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})
