"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileName = void 0;
var validateFileName = function (req, res, next) {
    var fileName = req.query.fileName;
    if (fileName) {
        next();
    }
    else {
        return res.status(404).send('no FileName found in prameters');
    }
};
exports.validateFileName = validateFileName;
