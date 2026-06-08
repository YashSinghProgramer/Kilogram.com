import React, { useState } from "react";
import Uplodecss from "./uplode.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Uplode() {
	const [file, setFile] = useState(null);
	const navigate = useNavigate();

	function uplodefile(e) {
		setFile(e.target.files[0]); // File state mein save ho gayi
	}

	async function noref(e) {
		e.preventDefault();

		if (!file) {
			alert("Enter Your Profile first");
			return;
		}

		const formData = new FormData();

		formData.append("profilePic", file);

		// Agar aap bio ya baaki cheezein bhi bhej rahe hain, toh aise add kar sakte hain:
		// formData.append("bio", "Hello world");

		try {
			// LocalStorage se token nikalna zaroori hai authentication ke liye
			const token = localStorage.getItem("token");

			const response = await axios.post(
				"http://localhost:5000/profileupload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						// FIXED: Authorization header bhejna zaroori hai
						Authorization: `Bearer ${token}`,
					},
				},
			);

			// FIXED: Navigate ko sahi jagah par likha (Jab response 200 OK aaye)
			if (response.status === 200) {
				alert("Profile successfully updated!");
				navigate("/Profile");
			}
		} catch (error) {
			// FIXED: console.log(e) ki jagah console.error(error) kiya taaki sahi error dikhe
			console.error(
				"Upload error details:",
				error.response ? error.response.data : error,
			);
			alert(error.response?.data?.message || "OOPS! Try a few minutes later");
		}
	}

	return (
		<div className={Uplodecss.Con}>
			<div className={Uplodecss.dataCon}>
				<form onSubmit={noref}>
					<input type="file" onChange={uplodefile} />
					<button type="submit">Upload</button>
				</form>
			</div>
		</div>
	);
}

export default Uplode;
