"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileName = void 0;
var validateFileName = function (req, res, next) {
    var _a = req.query, fileName = _a.fileName, height = _a.height, width = _a.width;
    if (fileName) {
        if (!(Number.isNaN(height) && Number.isNaN(width))) {
            next();
        }
        else {
            return res.status(404).send('please add a valid height and width');
        }
    }
    else {
        return res.status(404).send('no FileName found in prameters');
    }
};
exports.validateFileName = validateFileName;
