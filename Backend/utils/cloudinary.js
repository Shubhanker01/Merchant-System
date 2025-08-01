const cloudinary = require('cloudinary').v2
const fs = require('node:fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload file on cloudinary
        let res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log(res)
        fs.unlinkSync(localFilePath)
        return res.secure_url
    } catch (error) {
        console.log(error)
        // remove the locally saved file as upload operation got failed
        fs.unlinkSync(localFilePath)

    }
}

module.exports = { uploadOnCloudinary }