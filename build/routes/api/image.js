"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var validateFileName_1 = require("../../middlewares/validateFileName");
var utilities_1 = __importDefault(require("./utilities"));
var image = (0, express_1.Router)();
image.get('/', validateFileName_1.validateFileName, function (req, res) {
    var _a = req.query, fileName = _a.fileName, height = _a.height, width = _a.width;
    if (fileName) {
        var fullURL = path_1.default.join(__dirname, '../../../assets/images/full/', "".concat(fileName, ".jpg"));
        if (width && height) {
            var res1 = (0, utilities_1.default)(fileName, Number(width), Number(height));
            res.status(res1 === null || res1 === void 0 ? void 0 : res1.code);
            res.sendFile(res1 === null || res1 === void 0 ? void 0 : res1.url);
        }
        else {
            if (fs_1.default.existsSync(fullURL)) {
                res.status(304);
                res.sendFile(fullURL);
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
