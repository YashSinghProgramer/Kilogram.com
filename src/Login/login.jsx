import React from "react";
import style from "./logi.module.css";
import Leftside from "../left side/left.jsx";
import Rightside from "../right side/right.jsx";
function login() {
	return (
		<div className={style.Con}>
			<Leftside />
			<Rightside />
		</div>
	);
}

export default login;
