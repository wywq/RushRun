let baseUrl = "";
if (process.env.NODE_ENV === "development") {
	baseUrl = "http://app.mine-v.com/api/";
	// baseUrl = "http://kw.quyum.com/api/";
} else {
	baseUrl = "http://app.mine-v.com/api/";
	// baseUrl = "http://kw.quyum.com/api/";
}
const imgUrl = "http://app.mine-v.com/";
// const imgUrl = "http://kw.quyum.com/";
module.exports = {
	baseUrl,
	imgUrl,
};
