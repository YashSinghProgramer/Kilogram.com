import React from "react";
import Login from "./Login/login.jsx";
import Mainpage from "./main/mainapp.jsx";
import Signup from "./signup/signup.jsx";
import Profile from "./Profile/Profile.jsx";
import Uplode from "./Profile/uplode.jsx";
import { Route, Router, Routes } from "react-router-dom";
function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Main" element={<Mainpage />} />
				<Route path="/Signup" element={<Signup />} />
				<Route path="Profile" element={<Profile />} />
				<Route path="Uplode" element={<Uplode />} />
				{/* <Login/> */}
				{/* <Mainpage/> */}
			</Routes>
		</div>
	);
}

export default App;
