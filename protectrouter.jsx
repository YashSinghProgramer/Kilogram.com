import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
	// LocalStorage se check karo ki token hai ya nahi
	const token = localStorage.getItem("token");

	// Agar token nahi hai, toh user ko chalte bano bolkar Login page par redirect kar do
	if (!token) {
		return <Navigate to="/" replace />;
	}

	// Agar token hai, toh jo page kholna chahta hai (children) use kholne do
	return children;
}

export default ProtectedRoute;
