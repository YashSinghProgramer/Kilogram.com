import React, { useState, useEffect } from "react";
import Profilecss from "./Profile.module.css";
import Navbar from "../navbar/navbar.jsx";
import axios from "axios";

function Profile() {
	const [userData, setUserData] = useState({
		username: "Loading...",
		name: "Loading...",
		bio: "",
		posts: [],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				// LocalStorage se token pull kiya
				const token = localStorage.getItem("token");

				if (!token) {
					alert("No token found, please login first.");
					setLoading(false);
					return;
				}

				// FIXED: URL port changed to 5000 & config structure fixed
				const response = await axios.get(
					"https://kilogram-com-1.onrender.com//getprofile",
					{
						headers: {
							Authorization: `Bearer ${token}`, // Token passing to backend
							"Content-Type": "application/json",
						},
					},
				);

				const data = response.data;

				if (data.success) {
					setUserData({
						username: data.username,
						name: data.name,
						bio: data.bio,
						posts: data.posts || [],
					});
				}
			} catch (err) {
				console.error("Profile Fetching Failed:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	if (loading)
		return (
			<div style={{ color: "white", textAlign: "center", marginTop: "20%" }}>
				Loading Profile...
			</div>
		);

	return (
		<div className={Profilecss.con}>
			<div className={Profilecss.proNavbar}>
				<Navbar />
			</div>
			<div className={Profilecss.HF}>
				<div className={Profilecss.ProfileCon}>
					<div className={Profilecss.Profiledata}>
						<div className={Profilecss.prof}>
							<div className={Profilecss.imagesofprofile}>
								<img
									className={Profilecss.profileimg}
									src="https://picsum.photos/200"
									alt="profile"
								/>
								<img
									src="https://img.icons8.com/?size=100&id=oqWjYJSQSZAj&format=png&color=ffffff"
									alt="Plus"
									className={Profilecss.plus}
								/>
							</div>
							<div className={Profilecss.profiletext}>
								<h2 className={Profilecss.username}>{userData.username}</h2>
								<h3 className={Profilecss.name}>{userData.name}</h3>
								<div className={Profilecss.follow}>
									<h3>{userData.posts.length} Post</h3>
									<h3>24 follower</h3>
									<h3>50 following</h3>
								</div>
								<h4>{userData.bio}</h4>
							</div>
						</div>
						<div className={Profilecss.profilebtn}>
							<button>Edit Profile</button>
							<button>View </button>
						</div>
					</div>

					{/* Post Display Area */}
					<div className={Profilecss.postcon}>
						{userData.posts.length > 0 ? (
							userData.posts.map((post, idx) => (
								<img
									key={post._id || idx}
									src={post.imageUrl || post.url}
									alt="post"
								/>
							))
						) : (
							<h3 style={{ color: "gray", width: "100%", textAlign: "center" }}>
								No Posts Yet
							</h3>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
