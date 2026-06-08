const mongoose = require("mongoose");

async function connectDB() {
	try {
		await mongoose.connect(
			"mongodb+srv://yashsinghprogramer_db_user:Yash%40123@kilogram.zikcb8u.mongodb.net/UserLoginDB",
		);
		console.log("Connected to the Posts database successfully");
	} catch (err) {
		console.log("There is an error in connecting to the database", err);
	}
}
connectDB();

const PostSchema = new mongoose.Schema({
	postimg: {
		type: String,
		required: true,
		// unique: true,
	},
	caption: {
		type: String,
		default: "",
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	comment: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = PostModel;
