import React, { useEffect, useState } from "react";
import StyleSign from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
	// Component ka naam Capital (S) se shuru kiya (React Rule)
	const navigate = useNavigate();
	const [have, sethave] = useState(false);
	const [email, setemail] = useState("");
	const [name, setname] = useState("");
	const [password, setpassword] = useState("");
	const [username, setusername] = useState("");
	const [error, seterror] = useState(false);

	async function noref(e) {
		e.preventDefault();
		try {
			// Clean syntax: .then() hata kar seedha response ko variable mein liya
			const res = await axios.post("http://localhost:5000/signup", {
				username,
				password,
				email,
				name, // Agar backend mein name bhi save karwana hai toh
			});

			// res.body ki jagah res.data use kiya
			if (res.data && res.data.message !== "Username already exists") {
				sethave(true);
			} else {
				alert("Username already exists!");
				seterror(true);
			}
		} catch (error) {
			console.error("Signup error:", error);
			seterror(true);
		}
	}

	// Dependency array mein [have] daala taaki state true hote hi navigation chale
	useEffect(() => {
		if (have) {
			navigate("/");
		}
	}, [have, navigate]);

	return (
		<div className={StyleSign.con}>
			<div className={StyleSign.Contantcon}>
				<Link to={"/"}>
					<img
						src="https://img.icons8.com/?size=100&id=60636&format=png&color=ffffff"
						alt="Backarrow"
						className={StyleSign.imgarr}
					/>
				</Link>
				<h2 className={StyleSign.h2}>
					<img
						src="https://img.icons8.com/?size=100&id=1rWM8zYmJ1ks&format=png&color=ffffff"
						alt="Meta"
						className={StyleSign.img}
					/>
					Meta
				</h2>
				<h1 className={StyleSign.h1}>Get started on Instagram</h1>
				<h2 className={StyleSign.h2}>
					Sign up to see photos and videos from your friends.
				</h2>
				<form onSubmit={noref}>
					<h4 className={StyleSign.h4}>Mobile number or email</h4>
					<input
						type="text"
						placeholder="Mobile number or email"
						value={email}
						onChange={(e) => setemail(e.target.value)} // onChange add kiya
					/>

					{error && <p className={StyleSign.error}> User already exist!</p>}
					<h3 className={StyleSign.h3}>
						You may receive notifications from us.{" "}
						<span>Learn why we ask for your contact information</span>
					</h3>
					<h4 className={StyleSign.h4}>Password</h4>
					<input
						type="Password"
						placeholder="Password"
						value={password}
						onChange={(e) => setpassword(e.target.value)} // onChange add kiya
					/>
					<h4 className={StyleSign.h4}>Name</h4>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setname(e.target.value)} // onChange add kiya
					/>
					<h4 className={StyleSign.h4}>Username</h4>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setusername(e.target.value)} // onChange add kiya
					/>
					<h3 className={StyleSign.h3}>
						People who use our service may have uploaded your contact
						information to Instagram <span>Learn more</span>.
					</h3>
					<h3 className={StyleSign.h3}>
						By tapping Submit, you agree to create an account and to Instagram's{" "}
						<span>Terms</span> , <span>Privacy Policy</span> and
						<span> Cookies Policy</span> .
					</h3>
					<h3 className={StyleSign.h3}>
						The <span>Privacy Policy</span> describes the ways we can use the
						information we collect when you create an account. For example, we
						use this information to provide, personalize and improve our
						products, including ads.
					</h3>
					<button type="submit" className={StyleSign.submitbtn}>
						Submit
					</button>
					<Link to={"/"} className={StyleSign.Link}>
						{/* type="button" lagaya taaki ye button form ko submit na kar de */}
						<button type="button" className={StyleSign.btn2}>
							I already have an account
						</button>
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Signup;
