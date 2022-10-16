"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
function handelImageProccessing(fileName, width, height) {
    var thumbilURL = path_1.default.join(__dirname, '../../../assets/images/thumbnail/', "".concat(fileName).concat(height, "_").concat(width, ".jpg"));
    var fullURL = path_1.default.join(__dirname, '../../../assets/images/full/', "".concat(fileName, ".jpg"));
    if (fs_1.default.existsSync(thumbilURL)) {
        return { code: 200, url: thumbilURL };
    }
    else {
        (0, sharp_1.default)(fullURL)
            .resize(Number(width), Number(height))
            .toFile(thumbilURL, function () {
            return { code: 200, url: thumbilURL };
        });
    }
}
exports.default = handelImageProccessing;
