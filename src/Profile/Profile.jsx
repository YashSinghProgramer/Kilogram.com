import React, { useState, useEffect } from "react";
import Profilecss from "./Profile.module.css";
import Navbar from "../navbar/navbar.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
	const [userData, setUserData] = useState({
		username: "Loading...",
		name: "Loading...",
		bio: "",
		posts: [],
		profilepic: "",
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const token = localStorage.getItem("token");

				if (!token) {
					alert("No token found, please login first.");
					setLoading(false);
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

				const data = response.data;

				// Backend 'success: true' bhejta hai
				if (data.success) {
					setUserData({
						username: data.username,
						name: data.name,
						bio: data.bio,
						profilepic: data.profilepic, // Backend se mila hua string URL
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
									src={
										userData.profilepic ||
										"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
									}
									alt="profile"
								/>
								<Link to={"/Uplode"} className={Profilecss.plus}>
									<img
										src="https://img.icons8.com/?size=100&id=oqWjYJSQSZAj&format=png&color=ffffff"
										alt="Plus"
										className={Profilecss.plus}
									/>
								</Link>
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
