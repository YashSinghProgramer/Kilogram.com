const app = require("./app/app.js");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
	res.send("Server is Live mubark ho");
});
app.listen(PORT, () => {
	console.log(`Server is runnning on PORT: ${PORT}`);
});
