// chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
import axios from "axios";
const baseDomain = "https://us-central1-the-4mil-process.cloudfunctions.net/app";
const baseURL = `${baseDomain}`;

let axiosObj;
axiosObj = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});
export default axiosObj;
