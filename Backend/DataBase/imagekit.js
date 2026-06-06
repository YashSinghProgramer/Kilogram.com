const imagekit = require("@imagekit/nodejs");
require("dotenv").config();
const imagekitkey = new imagekit({
	// publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT,
});

async function uploadImage(file) {
	const result = await imagekitkey.files.upload({
		file: file.toString("base64"),
		fileName: "image.jpg",
	});
	return result;
}

module.exports = uploadImage;
