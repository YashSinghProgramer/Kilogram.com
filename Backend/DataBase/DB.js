const mongoose = require("mongoose");
require("dotenv").config();
async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to the database successfully"); // Isko try block ke andar hona chahiye
	} catch (err) {
		console.log("There is an error in connecting to the database", err);
	}
}
connectDB();

const userSchema = new mongoose.Schema({
	// FIX: Array brackets [] hata diye hain, kyunki username ek single string hogi
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		default: "",
	},
	Bio: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	// FIX: Password se bhi [] hata diya hai
	password: {
		type: String,
		required: true,
	},
	profilepic: {
		type: String,
		default: "",
	},
	// Yeh sahi hain kyunki followers/following/posts hamesha multiple (Array) hote hain
	followers: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	following: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	bookmark: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
