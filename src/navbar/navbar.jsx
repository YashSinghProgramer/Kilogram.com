import React, { useEffect, useState } from "react";
import Style from "./nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
	const navigate = useNavigate();
	const [profile, setProfile] = useState("");
	function logout() {
		navigate("/");
		localStorage.removeItem("token");
	}
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
				}
			} catch (err) {
				console.error("Navbar profile fetch failed:", err);
			}
		};

		fetchNavbarProfile();
	}, []);

	return (
		<div className={Style.NavCon}>
			<div className={Style.logo}>
				<img
					src="https://img.icons8.com/?size=100&id=DpOQ6G5p47f0&format=png&color=ffffff"
					alt="logo"
				/>
			</div>
			<div className={Style.menulist}>
				<ul>
					<Link to={"/Main"}>
						<li className={Style.home}>
							<img
								className={Style.homeimg}
								src="https://img.icons8.com/?size=100&id=86527&format=png&color=ffffff"
								alt="Logo"
							/>
							Home
						</li>
					</Link>
					<li>
						<img
							className={Style.reel}
							src="https://img.icons8.com/?size=100&id=bgJJTYimOf01&format=png&color=ffffff"
							alt="Logo"
						/>
						Reel
					</li>
					<li>
						<img
							className={Style.Messages}
							src="https://img.icons8.com/?size=100&id=12628&format=png&color=ffffff"
							alt="Logo"
						/>
						Messages
					</li>
					<li>
						<img
							src="https://img.icons8.com/?size=100&id=59878&format=png&color=ffffff"
							alt="Logo"
						/>
						Search
					</li>
					<li>
						<img
							className={Style.Explore}
							src="https://img.icons8.com/?size=100&id=88004&format=png&color=ffffff"
							alt="Logo"
						/>
						Explore
					</li>
					<li>
						<img
							src="https://img.icons8.com/?size=100&id=16076&format=png&color=ffffff"
							alt="Logo"
						/>
						Notifications
					</li>
					<li>
						<img
							className={Style.create}
							src="https://img.icons8.com/?size=100&id=TDaRPAsMt1Bs&format=png&color=ffffff"
							alt="Logo"
						/>
						Create
					</li>
					<li>
						<img
							className={Style.Deshboard}
							src="https://img.icons8.com/?size=100&id=59735&format=png&color=ffffff"
							alt="Logo"
						/>
						Dashboard
					</li>
					<Link to={"/Profile"} className={Style.profilelink}>
						<li className={Style.proli}>
							<img
								src={
									profile ||
									"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50"
								}
								alt="Profile"
								className={Style.prologo}
							/>
							Profile
						</li>
					</Link>
				</ul>
			</div>
			<h4 onDoubleClick={logout}>
				<img
					src="https://img.icons8.com/?size=100&id=vcvBMGD6n6ZL&format=png&color=ffffff"
					alt="logo"
				/>
				Logout
			</h4>
		</div>
	);
}

export default Navbar;
