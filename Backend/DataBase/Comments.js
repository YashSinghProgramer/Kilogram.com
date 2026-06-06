const mongoose = require("mongoose");

// TIP: Is connectDB ko yahan se poora hata dena chahiye agar aapne main file (app.js/index.js) mein connect kar liya hai.
async function connectDB() {
	try {
		await mongoose.connect(
			"mongodb+srv://yashsinghprogramer_db_user:Yash%40123@kilogram.zikcb8u.mongodb.net/UserLoginDB",
		);
		console.log("Connected to the Comments database successfully");
	} catch (err) {
		console.log("There is an error in connecting to the database", err);
	}
}
connectDB();

const CommentSchema = new mongoose.Schema(
	{
		text: {
			type: String, // <--- FIX: 'type: String' add kiya
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true, // <--- FIX: Brackets [] hata diye, kyunki comment karne wala ek hi banda hoga
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post", // <--- FIX: Reference "Post" model ka hoga, "User" ka nahi
			required: true, // <--- FIX: Brackets [] hata diye aur 'require' ko 'required' kiya
		},
	},
	{ timestamps: true },
); // Isse createdAt aur updatedAt apne aap mil jayega (Optional par accha hai)

// FIX: Model ka naam "Comment" rakha aur sahi schema pass kiya
const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
