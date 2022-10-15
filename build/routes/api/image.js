"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var validateFileName_1 = require("../../middlewares/validateFileName");
var image = (0, express_1.Router)();
image.get('/', validateFileName_1.validateFileName, function (req, res) {
    var _a = req.query, fileName = _a.fileName, height = _a.height, width = _a.width;
    if (fileName) {
        var fullURL = path_1.default.join(__dirname, '../../../assets/images/full/', "".concat(fileName, ".jpg"));
        if (width && height) {
            var thumbilURL_1 = path_1.default.join(__dirname, '../../../assets/images/thumbil/', "".concat(fileName).concat(height, "_").concat(width, ".jpg"));
            if (fs_1.default.existsSync(thumbilURL_1)) {
                res.status(200);
                res.sendFile(thumbilURL_1);
            }
            else {
                (0, sharp_1.default)(fullURL)
                    .resize(Number(width), Number(height))
                    .toFile(thumbilURL_1, function () {
                    res.status(304);
                    res.sendFile(thumbilURL_1);
                });
            }
        }
        else {
            var fullURL_1 = path_1.default.join(__dirname, '../../../assets/images/full/', "".concat(fileName, ".jpg"));
            if (fs_1.default.existsSync(fullURL_1)) {
                res.status(304);
                res.sendFile(fullURL_1);
            }
            else {
                res.status(401);
                res.send('File Name Dose Not Exist');
            }
        }
    }
    else {
        res.status(401);
        res.send('No parameters passed');
    }
});
exports.default = image;
