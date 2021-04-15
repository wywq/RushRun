let baseUrl = "";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://118.190.174.163/";
} else {
  // baseUrl = "http://8.210.127.30/";
  baseUrl = "http://118.190.174.163/";
}
module.exports = {
  baseUrl,
};
