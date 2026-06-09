import React, { useEffect, useState } from "react";
import profileupdatecss from "./profilwupadate.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function profileupdate() {
	const [userprofile, setuserprofile] = useState(null);
	const [username, setusername] = useState(null);
	const [name, setname] = useState(null);
	const [Bio, setuserBio] = useState(null);
	const navigation = useNavigate();
	async function preventref(e) {
		e.preventDefault();
		const token = localStorage.getItem("token");
		if (!token) {
			alert("Token were not Found");
			return;
		}
		try {
			await axios.post(
				"https://kilogram-com-1.onrender.com/updateprofile",
				{ username, name, Bio },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);
			if (username == !null) {
				localStorage.removeItem("token");
				navigation("/");
			}

			navigation("/profile");
		} catch (error) {
			alert(error);
		}
	}
	async function fetchdata() {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				alert("Token were not Found");
				return;
			}
			const response = await axios.get(
				"https://kilogram-com-1.onrender.com/getprofile",
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			const responsedata = response.data;

			setusername(responsedata.username);
			setname(responsedata.name);
			setuserprofile(responsedata.profilepic);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchdata();
	}, []);
	return (
		<div className={profileupdatecss.updateCon}>
			<div className={profileupdatecss.ProfileConforupdate}>
				<h1>Edit profile</h1>
				<div className={profileupdatecss.Profilepreview}>
					<div>
						<img src={userprofile} alt="Profileimg" />
						<h3>
							{username}
							<span>{name}</span>
						</h3>
					</div>

					<Link to={"/Uplode"} className={profileupdatecss.changebtn}>
						<button>Change Profile</button>
					</Link>
				</div>
				<form onSubmit={preventref}>
					<h5>Username</h5>
					<input
						type="text"
						placeholder="Enter your Username "
						onChange={(e) => setusername(e.target.value)}></input>
					<h5>Name</h5>
					<input
						type="text"
						placeholder="Enter your Name"
						onChange={(e) => {
							setname(e.target.value);
						}}></input>
					<h5>Bio</h5>
					<input
						type="text"
						placeholder="Enter your Bio"
						onChange={(e) => {
							setuserBio(e.target.value);
						}}></input>
					<button type="submit" className={profileupdatecss.submitbtn}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default profileupdate;
