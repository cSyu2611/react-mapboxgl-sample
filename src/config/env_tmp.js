const mapboxAccessToken = "YOUR ACCESS TOKEN HERE";

const demoAPI = "https://demomap.dataeye.jp/api";

const THRESHOLD2048 = {
  "0": "rgba(42, 0, 255, 0.5)",
  "64": "rgba(0, 102, 255, 0.5)",
  "128": "rgba(0, 240, 255, 0.5)",
  "256": "rgba(114, 255, 0, 0.5)",
  "512": "rgba(255, 222, 0, 0.5)",
  "1024": "rgba(255, 131, 20, 0.5)",
  "2048": "rgba(255, 0, 66, 0.5)"
};

module.exports = {
  mapboxAccessToken,
  demoAPI,
  THRESHOLD2048
};