import React, { useState, useEffect } from "react";
import style from "./right.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Right() {
	const navigate = useNavigate();
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userError, setuserError] = useState(false);

	const norefersh = async (e) => {
		e.preventDefault();
		try {
			// FIXED: check kar lena backend ka port 3000 h ya 5000
			const response = await axios.post(
				"https://kilogram-com-1.onrender.com/login",
				{ username, password },
				{ withCredentials: true }, // FIXED: Cookie pass hone ke liye compulsory h
			);

			setpassword("");

			if (response.data.message === "Login successful") {
				// FIXED: Agar backend token de rha h, toh use localStorage me daal do profile page k liye
				if (response.data.token) {
					localStorage.setItem("token", response.data.token);
				}

				setIsLoggedIn(true);
			} else {
				setuserError(true);
			}
		} catch (error) {
			console.error("Login error:", error);
			setuserError(true);
			setpassword("");

			setTimeout(() => {
				setuserError(false);
			}, 4000);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/Main"); // Success hone par redirect
		}
	}, [isLoggedIn, navigate]);

	return (
		<div className={style.rightcon}>
			<div className={style.dete}>
				<h4>Log into Kilogram</h4>
				<div>
					<form className={style.logform} onSubmit={norefersh}>
						<div>
							<input
								type="text"
								placeholder="Mobile number, username or email"
								value={username}
								onChange={(e) => setusername(e.target.value.toLowerCase())}
								required
							/>

							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setpassword(e.target.value)}
								required
							/>
							{userError && (
								<p className={style.error}>Invalid username or password</p>
							)}
						</div>
						<button type="submit" className={style.login}>
							Log in
						</button>

						<h2>Forgot password?</h2>
					</form>
				</div>
				<div className={style.otherlog}>
					<button className={style.logbtn}>
						<img
							src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
							alt="facebooklogo"
						/>{" "}
						Log in with Facebook
					</button>
					<Link to={"/signup"}>
						<button className={style.crebtn}> Create new account</button>{" "}
					</Link>
				</div>

				<h5>
					<img
						src="https://img.icons8.com/?size=100&id=PvvcWRWxRKSR&format=png&color=000000"
						alt="logo"
					/>
					Meta
				</h5>
			</div>
		</div>
	);
}

export default Right;
