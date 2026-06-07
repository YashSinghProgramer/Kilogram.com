import React from "react";
import Style from "./message.module.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
function Message() {
	// 1. Ekdum real-looking unique data array bana diya (4 logon ke liye)
	const suggestedUsers = [
		{
			id: 1,
			username: "rohit_sharma_45",
			fullname: "Rohit Sharma",
			randomId: 101,
		},
		{
			id: 2,
			username: "sneha_kapoor",
			fullname: "Sneha Kapoor",
			randomId: 102,
		},
		{ id: 3, username: "priya.verma", fullname: "Priya Verma", randomId: 103 },
		{ id: 4, username: "aman_dxb", fullname: "Aman Malik", randomId: 104 },
		{ id: 5, username: "ishita_99", fullname: "Ishita Sharma", randomId: 105 },
		//   { id: 6, username: "kabir_singh_vlogs", fullname: "Kabir Malhotra", randomId: 106 },
		//   { id: 7, username: "ananya_art", fullname: "Ananya Joshi", randomId: 107 },
		//   { id: 8, username: "vicky_kaushal_fan", fullname: "Vikram Rathore", randomId: 108 },
		//   { id: 9, username: "neha_structures", fullname: "Neha Gupta", randomId: 109 }
	];
	const [profile, setProfile] = useState("");
	const [username, setusername] = useState("");
	const [name, setname] = useState("");

	useEffect(() => {
		const fetchNavbarProfile = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) return;

				const response = await axios.get(
					"https://kilogram-com-1.onrender.com/getprofile",
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					},
				);

				const data = response.data;

				if (data.success) {
					setProfile(data.profile || data.profilepic);
					setusername(data.username);
					setname(data.name);
				}
			} catch (err) {
				console.error("Navbar profile fetch failed:", err);
			}
		};

		fetchNavbarProfile();
	}, []);
	return (
		<div className={Style.messageCon}>
			<div className={Style.allmessage}>
				{/* Main User Profile (Aapki khud ki) */}
				<div className={Style.profile}>
					<img
						src={
							profile ||
							"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50"
						}
						alt="my_profile"
					/>
					<div className={Style.usernames}>
						<h3>{username}</h3>
						<h6>{name}</h6>
					</div>
					<h5>Switch</h5>
				</div>

				{/* Suggested Section */}
				<div className={Style.otherprofile}>
					<div className={Style.profiletext}>
						<h1>Suggested for you</h1>
						<h6>See all</h6>
					</div>

					<div className={Style.otherusers}>
						{/* Ab hum apne static array ko map kar rahe hain */}
						{suggestedUsers.map((user) => (
							<div className={Style.otherproser} key={user.id}>
								{/* user.randomId ki wajah se har photo alag aur unique aayegi */}
								<img
									src={`https://picsum.photos/200?random=${user.randomId}`}
									alt="suggested_profile"
								/>
								<div className={Style.usernames}>
									<h3>{user.username}</h3>
									<h6>{user.fullname}</h6>
								</div>
								<h2>Follow</h2>
							</div>
						))}
					</div>
					<div className={Style.footer}>
						<h1>
							About .Help .Press .API .Jobs .Privacy .Terms .Locations
							.Languages .Meta Verified
						</h1>
						<p>&copy; 2026 KILOGRAM FROM YASHDEV </p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Message;
