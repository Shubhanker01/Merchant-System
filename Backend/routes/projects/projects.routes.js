const express = require('express')
const router = express.Router()
const { upload } = require('../../middlewares/multer')
const { addProject } = require('../../controllers/projects/projects.controller')

router.route('/v1/projects/add').post(upload.single('attachment'), addProject)

module.exports = router