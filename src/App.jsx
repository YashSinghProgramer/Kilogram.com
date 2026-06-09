import React from "react";
import Login from "./Login/login.jsx";
import Mainpage from "./main/mainapp.jsx";
import Signup from "./signup/signup.jsx";
import Profile from "./Profile/Profile.jsx";
import Uplode from "./Profile/uplode.jsx";
import Postupload from "./postuplode/postuplode.jsx";
import { Route, Router, Routes } from "react-router-dom";
import ProtectedRoute from "./protectrouter.jsx";
import Updateprofile from "./UpdateProfile/profileupdate.jsx";
function App() {
	return (
		<div>
			<Routes>
				{/* Public Routes (Inke liye login ki zaroorat nahi hai) */}
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				{/* Protected Routes (Bina login kiye koi andar nahi ghus sakta) */}
				<Route
					path="/Main"
					element={
						<ProtectedRoute>
							<Mainpage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/Profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/Uplode"
					element={
						<ProtectedRoute>
							<Uplode />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/Postupload"
					element={
						<ProtectedRoute>
							<Postupload />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
