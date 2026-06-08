import React, { useEffect, useState } from "react";
import postuplodecss from "./postuplode.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function postuplode() {
	const navigate = useNavigate();
	const [username, setusername] = useState("");
	const [profile, setprofile] = useState("");
	const [file, setfile] = useState(null);
	const [caption, setcaption] = useState("");

	async function formhandel(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("postPic", file);
		formData.append("caption", caption);
		const token = localStorage.getItem("token");
		if (!token) return;
		try {
			const userpost = await axios.post(
				"https://kilogram-com-1.onrender.com/Postuplode",
				formData, // <-- 4. Sahi data (formData) bheja
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				},
			);
			if (userpost.status === 200 || userpost.status === 201) {
				navigate("/Profile");
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function fecthdata() {
		const token = localStorage.getItem("token");
		if (!token) return;
		const userdata = await axios.get(
			"https://kilogram-com-1.onrender.com/getprofile",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			},
		);

		setusername(userdata.data.username);
		setprofile(userdata.data.profilepic);
	}
	useEffect(() => {
		fecthdata();
	}, []);
	return (
		<div className={postuplodecss.PostCon}>
			<form className={postuplodecss.postcon} onSubmit={formhandel}>
				<div className={postuplodecss.postheader}>
					<img src={profile} alt="Profileimg" />
					<h2>{username}</h2>
				</div>
				<input type="file" onChange={(e) => setfile(e.target.files[0])}></input>
				<input
					type="text"
					onChange={(e) => setcaption(e.target.value)}
					placeholder="Enter your Caption here"></input>
				<button type="submit">Upload</button>
			</form>
		</div>
	);
}

export default postuplode;
