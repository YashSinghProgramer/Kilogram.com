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
	// * hata kar exact apne frontend ka URL likhein
	origin: "https://kilogramcom.vercel.app/",
	credentials: true, // Taaki cookies/headers allow ho sakein
	methods: "GET,POST,PUT,DELETE",
	allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const upload = multer({ storage: multer.memoryStorage() });

const JWT_SECRET = "LodaLasan"; // Ek jagah fix kar diya variable me

// 1. User Registration
app.post("/signup", async (req, res) => {
	const { username, email, password, name } = req.body;

	try {
		const userExists = await userModel.findOne({
			username: username.toLowerCase(),
		});
		console.log(username);
		if (userExists) {
			return res.status(400).json({ message: "Username already exists" });
			console.log(userExists);
		}

		const hash = await bcrypt.hash(password, 10);
		await userModel.create({
			username: username.toLowerCase(),
			email: email,
			password: hash,
			name: name,
		});

		return res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error occurred while registering user" });
	}
});

// 2. User Login (FIXED)
app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	if (!username || username.trim() === "") {
		return res.status(400).json({ message: "Please Enter username" });
	}

	try {
		const user = await userModel.findOne({ username: username });
		if (!user) {
			return res.status(400).json({ message: "Invalid username or password" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid Password" });
		}

		// FIXED: 'user.username' use kiya na ki model
		const token = jwt.sign(
			{ username: user.username },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			},
		);

		// FIXED: Cookie pehle set hogi, fir final response jayega
		res.cookie("token", token, { httpOnly: true, secure: false }); // development me secure false thik h

		return res.status(200).json({
			message: "Login successful",
			token: token, // Frontend par localStorage me rakhne ke liye token response me bhi de diya
		});
	} catch (error) {
		return res.status(500).json({ message: "Server error during login" });
	}
});

// 3. Profile Upload (FIXED Syntax & Multer)
app.post("/profileupload", upload.single("profilePic"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Please upload an image" });
		}

		const img_url = await uploadImage(req.file.buffer);
		const { bio, post } = req.body; // FIXED: Proper Javascript destructuring

		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Authentication failed!" });
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const username = decoded.username;

		// FIXED: Typo handled (img_url used properly)
		const updatedUser = await userModel.findOneAndUpdate(
			{ username: username },
			{
				$set: {
					profile: img_url,
					bio: bio,
					post: post,
				},
			},
			{ new: true },
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found!" });
		}

		return res.status(200).json({
			message: "Profile successfully updated!",
			user: updatedUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error or Invalid Token!" });
	}
});

// 4. Get Profile Data (FIXED DB Fetching)
app.get("/getprofile", async (req, res) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Authentication failed!" });
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const username = decoded.username;

		// FIXED: Pehle user database se dhundho tabhi toh bio/profile milegi!
		const user = await userModel.findOne({ username: username });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Assuming aapne PostModel banaya hai user ke posts store karne k liye
		const posts = await PostModel.find({ username: username });

		return res.status(200).json({
			success: true,
			username: user.username,
			name: user.name || " ", // DB me name field ho toh user.name chalega
			bio: user.bio || "No bio yet",
			posts: posts || [],
		});
	} catch (error) {
		return res.status(401).json({ message: "Invalid or Expired Token!" });
	}
});

module.exports = app;
