"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeUpload = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var storeUpload = function storeUpload(stream, resourceType) {
  _cloudinary["default"].config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  return new Promise(function (resolve, reject) {
    var buffer = _cloudinary["default"].v2.uploader.upload_stream({
      resource_type: resourceType
    }, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });

    stream.pipe(buffer);
  });
};

exports.storeUpload = storeUpload;
//# sourceMappingURL=uploader.js.map