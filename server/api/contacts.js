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

router.post('/:userId', async (req, res, next) => {
  try {
    console.log('REQ BODY=>', req.body)
    if (req.body.message) {
      await Contact.create({
        contactName: req.body.contactName,
        number: req.body.number,
        userId: req.params.userId,
        message: req.body.message
      })
    } else {
      await Contact.create({
        contactName: req.body.contactName,
        number: req.body.number,
        userId: req.params.userId
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.session.passport.user
    const currentUser = await User.findByPk(id)
    await currentUser.removeContact(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
