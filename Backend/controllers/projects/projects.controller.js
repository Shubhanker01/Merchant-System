const { Project } = require('../../models/projects.model')
const { uploadOnCloudinary } = require('../../utils/cloudinary')

// add a new project
const addProject = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("Attachment not added! Please add the attachment")
        let { title, description, budgetRange, deadline } = req.body
        if (!title || !description || !budgetRange || !deadline) {
            return res.status(400).send("Please enter full information")
        }
        let resultUrl = await uploadOnCloudinary(req.file.path)
        if (!resultUrl) {
            return res.status(500).send("Some error occured on uploading")
        }
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
