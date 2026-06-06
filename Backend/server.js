const app = require("./app/app.js");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is runnning on PORT: ${PORT}`);
});
