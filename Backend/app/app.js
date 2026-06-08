// Packages
const express = require("express");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const userModel = require("../DataBase/DB.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const PostModel = require("../DataBase/Post.js");
const CommentModel = require("../DataBase/Comments.js");
const multer = require("multer");
const uploadImage = require("../DataBase/imagekit.js");
require("dotenv").config();
const app = express();

// Middleware
const corsOptions = {
	origin: "https://kilogramcom.vercel.app", // Production ke liye
	// origin: "http://localhost:5173", // Local development ke liye
	credentials: true,
	methods: "GET,POST,PUT,DELETE",
	allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const upload = multer({ storage: multer.memoryStorage() });

// 1. User Registration
app.post("/signup", async (req, res) => {
	const { username, email, password, name } = req.body;

	if (!username || !email || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const normalizedUsername = username.trim().toLowerCase();
		const userExists = await userModel.findOne({
			username: normalizedUsername,
		});

		if (userExists) {
			return res.status(400).json({ message: "Username already exists" });
		}

		const hash = await bcrypt.hash(password, 10);
		await userModel.create({
			username: normalizedUsername,
			email: email,
			password: hash,
			name: name,
		});

		return res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Signup Error:", error);
		return res
			.status(500)
			.json({ message: "Error occurred while registering user" });
	}
});

// 2. User Login
app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	if (!username || username.trim() === "" || !password) {
		return res
			.status(400)
			.json({ message: "Please enter username and password" });
	}

	try {
		// FIXED: .toLowerCase() lagaya taaki case-matching issue na ho
		const normalizedUsername = username.trim().toLowerCase();
		const user = await userModel.findOne({ username: normalizedUsername });

		if (!user) {
			return res.status(400).json({ message: "Invalid username or password" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid username or password" });
		}

		const token = jwt.sign(
			{ username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" },
		);

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Production me true hoga
			sameSite: "lax",
		});

		return res.status(200).json({
			message: "Login successful",
			token: token,
		});
	} catch (error) {
		console.error("Login Error:", error);
		return res.status(500).json({ message: "Server error during login" });
	}
});

// 3. Profile Upload
app.post("/profileupload", upload.single("profilePic"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Please upload an image" });
		}

		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ message: "Authentication failed! No token provided." });
		}

		const token = authHeader.split(" ")[1];

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (jwtErr) {
			return res.status(401).json({ message: "Invalid or Expired Token!" });
		}

		const username = decoded.username;

		// ImageKit Upload
		console.log("Uploading image to ImageKit...");
		const img_data = await uploadImage(req.file.buffer); // Iska naam img_data rakh dete hain clearity ke liye
		console.log("Image uploaded successfully!");

		const { bio } = req.body;

		// FIXED: Pure object ki jagah sirf .url nikal kar save kar rahe hain
		const updateData = {
			profilepic: img_data.url, // <-- YAHAN CHANGE KIYA HAI
		};

		if (bio) updateData.bio = bio;

		// Mongoose warning ko hatane ke liye returnDocument: 'after' use kiya hai
		const updatedUser = await userModel
			.findOneAndUpdate(
				{ username: username },
				{ $set: updateData },
				{ returnDocument: "after" }, // Mongoose warning fix here
			)
			.select("-password");

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found!" });
		}

		return res.status(200).json({
			message: "Profile successfully updated!",
			user: updatedUser,
		});
	} catch (error) {
		console.error("--- SERVER ERROR 500 DETAILS ---");
		console.error(error);
		console.error("--------------------------------");
		return res.status(500).json({
			message: "Server error during profile update!",
			error: error.message,
		});
	}
});

// 4. Get Profile Data
app.get("/getprofile", async (req, res) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Authentication failed!" });
		}

		const token = authHeader.split(" ")[1];

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (jwtErr) {
			return res.status(401).json({ message: "Invalid or Expired Token!" });
		}

		const username = decoded.username;
		const user = await userModel
			.findOne({ username: username })
			.select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const posts = await PostModel.find({ username: username });

		return res.status(200).json({
			success: true,
			username: user.username,
			name: user.name || "",
			bio: user.bio || "No bio yet",
			profilepic: user.profile || user.profilepic,
			posts: posts || [],
		});
	} catch (error) {
		console.error("Get Profile Error:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
});

app.post("/Postuplode", upload.single("postPic"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "File was not uploaded" });
		}

		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Unauthorized! Token missing." });
		}

		const token = authHeader.split(" ")[1];
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			return res.status(401).json({ message: "Invalid or Expired Token!" });
		}

		const user = await userModel.findOne({ username: decoded.username });
		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		console.log("Uploading post image to ImageKit...");
		const img_data = await uploadImage(req.file.buffer);
		console.log("Post image uploaded successfully!");

		// Debugging ke liye terminal mein dekhne ke liye (Ki ImageKit kya de raha hai)
		console.log("ImageKit URL:", img_data?.url);

		const { caption } = req.body;

		// FIXED: 'postimg' ki jagah 'img' kiya jo tumhare Schema se match karta hai
		const newPost = await PostModel.create({
			postimg: img_data.url || img_data.secure_url,
			caption: caption || "",
			author: user._id,
		});

		user.post.push(newPost._id);
		await user.save();

		return res.status(201).json({
			success: true,
			message: "Post created successfully! 🎉",
			post: newPost,
		});
	} catch (error) {
		console.error("Post Upload Server Error:", error);
		return res.status(500).json({
			message: "Server error while sharing post!",
			error: error.message,
		});
	}
});

app.get("/getpost", async (req, res) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Authentication failed!" });
		}

		const token = authHeader.split(" ")[1];

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
		} catch (jwtErr) {
			return res.status(401).json({ message: "Invalid or Expired Token!" });
		}

		const username = decoded.username;

		// 1. Ek hi baar mein user ko dhoondha aur uske andar ke 'post' array ko POPULATE kiya
		const user = await userModel
			.findOne({ username: username })
			.select("-password")
			.populate("post"); // <-- Isse IDs ki jagah asli post ka data mil jayega

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// 2. Response bheja (Ab 'posts' dhoondne ki alag se zaroorat nahi)
		return res.status(200).json({
			success: true,
			username: user.username,
			profilepic: user.profile || user.profilepic || "",
			posts: user.post || [],
		});
	} catch (e) {
		console.log("Get Post Server Error:", e);
		return res.status(500).json({ message: "Server Error", error: e.message }); // Catch block mein response dena zaroori hai warna frontend load hota rahega
	}
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
