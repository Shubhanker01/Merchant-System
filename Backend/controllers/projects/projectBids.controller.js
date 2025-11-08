// handle bids operations for projects
const { projectBids } = require('../../models/projectBids.model')
const { Merchant } = require('../../models/merchant.model')
const { Project } = require('../../models/projects.model')
const fs = require('node:fs')
const { uploadOnCloudinary } = require('../../utils/cloudinary')


// add a bid to a project
const addBidToProject = async (req, res) => {
    try {
        let { projectId, price, expectedDate, bidderEmail, bidderId } = req.body
        // check if all the fields are present
        if (!projectId || !price || !expectedDate || !bidderEmail || !bidderId) {
            return res.status(400).send("Please enter full information")
        }
        // check if projectId is valid
        let project = await Project.findById(projectId)
        if (!project) {
            return res.status(400).send("Project not found")
        }
        // check if the expected date is less than or equal to project deadline
        if (new Date(expectedDate).getTime() > new Date(project.deadline).getTime()) {
            return res.status(400).send("Expected date should be less than or equal to project deadline")
        }
        // check if proposal attachment is present
        if (!req.file) {
            return res.status(400).send("Proposal attachment is not added! Please add the attachment")
        }
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
        // create a new bid
        let bid = await projectBids.create({
            projectId: projectId,
            price: price,
            expectedDate: new Date(expectedDate),
            bidderEmail: bidderEmail,
            bidderId: bidderId,
            proposal: resultUrl
        })
        // increment notification count for recipient
        await Merchant.findByIdAndUpdate(project.createrId, {
            $inc: {
                notificationCount: 1
            }
        })
        return res.status(200).json({
            message: "Successfully placed your bid in the project",
            bid
        })
    }
    catch (error) {
        console.log(error)
    }
}

// check if the bidder has already placed a bid on the project
const hasPlacedBid = async (req, res) => {
    try {
        let { projectId } = req.params
        let bidderEmail = req.user.email
        // check if all the fields are present
        if (!projectId || !bidderEmail) {
            return res.status(400).send("please provide all the information")
        }
        // make db call
        let bid = await projectBids.exists({ projectId: projectId, bidderEmail: bidderEmail })
        return res.status(200).json({ placedBid: bid ? true : false })
    } catch (error) {
        console.log(error)
    }
}


module.exports = { addBidToProject, hasPlacedBid }
