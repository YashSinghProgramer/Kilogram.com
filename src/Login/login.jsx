import React from "react";
import style from "./logi.module.css";
import Leftside from "../left side/left.jsx";
import Rightside from "../right side/right.jsx";
function login() {
	return (
		<div className={style.Con}>
			<Leftside className={style.lefft} />
			<Rightside className={style.right} />
		</div>
	);
}

export default login;
