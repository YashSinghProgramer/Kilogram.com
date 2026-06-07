import React, { useState, useEffect } from "react";
import Style from "./storys.module.css";
import axios from "axios";

function Storys() {
	// Component ka naam Capital (S) se shuru kiya
	const [userImages, setUserImages] = useState([]);
	const [username, setUsername] = useState("");

	// API se data lane ke liye function
	const getdata = async () => {
		try {
			const response = await axios.get(
				"https://picsum.photos/v2/list?page=2&limit=40",
			);
			setUserImages(response.data); // Data ko state mein save kiya
		} catch (error) {
			console.error("Data laane mein error aaya:", error);
		}
	};

	// Component load hote hi API call karne ke liye useEffect lagaya
	useEffect(() => {
		getdata();
	}, []);
	const [profile, setProfile] = useState("");

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
					setUsername(data.username);
				}
			} catch (err) {
				console.error("Navbar profile fetch failed:", err);
			}
		};

		fetchNavbarProfile();
	}, []);
	const localStories = [
		{
			name: "rajput_yash.20",
			img: "https://picsum.photos/200",
		},
	];

	return (
		<div className={Style.Con}>
			{/* 1. Pehle aapka local data dikhega */}
			{localStories.map((story, index) => (
				<div className={Style.Story} key={`local-${index}`}>
					<img
						src={
							profile ||
							"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50"
						}
						alt="profile_img"
					/>
					<h3>{username}</h3>
				</div>
			))}

			{/* 2. Fir API (Picsum) se aaya hua data dikhega */}
			{userImages.map((elem, idx) => (
				<div className={Style.Story} key={`api-${elem.id || idx}`}>
					<img src={elem.download_url} className={Style.img} alt="api_img" />
					<h3>{elem.author}</h3>
				</div>
			))}
		</div>
	);
}

export default Storys;
