const express = require('express')
const router = express.Router()
const { upload } = require('../../middlewares/multer')
const { authenticateToken } = require('../../middlewares/authenticateToken')
const { addProject, displayProject } = require('../../controllers/projects/projects.controller')

router.route('/v1/projects/add').post(authenticateToken, upload.single('attachment'), addProject)
// router.route('/v1/projects/display').get(displayProject)

module.exports = router