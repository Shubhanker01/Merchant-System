const { Project } = require('../../models/projects.model')
const { uploadOnCloudinary } = require('../../utils/cloudinary')
const fs = require('node:fs')

// add a new project
const addProject = async (req, res) => {
    try {
        // check if the title or other text body is missing
        let { title, description, budgetRange, deadline } = req.body
        if (!title || !description || !budgetRange || !deadline) {
            return res.status(400).send("Please enter full information")
        }
        // check if the attachment is added
        if (!req.file) return res.status(400).send("Attachment not added! Please add the attachment")
        console.log(req.file)
        // check if the file type is correct
        if (req.file.mimetype !== 'application/pdf') {
            // remove the file 
            fs.unlinkSync(req.file.path)
            return res.status(400).send("Please send the attachment in pdf")
        }
        // check for the file size
        if (req.file.size > 1048576) {
            fs.unlinkSync(req.file.path)
            return res.status(400).send("Attachment size should be equal to 1MB or less than that")
        }
        // upload to cloudinary
        let resultUrl = await uploadOnCloudinary(req.file.path)
        if (!resultUrl) {
            return res.status(500).send("Some error occured on uploading")
        }
        // finally save in database 
        await Project.create({
            title: title,
            description: description,
            budgetRange: budgetRange,
            deadline: new Date(deadline),
            attachments: resultUrl
        })
        return res.status(200).send("Project successfully added")

    } catch (error) {
        console.log(error)
    }
}



module.exports = { addProject }
