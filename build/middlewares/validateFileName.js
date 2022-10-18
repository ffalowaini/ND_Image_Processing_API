"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileName = void 0;
var validateFileName = function (req, res, next) {
    var _a = req.query, fileName = _a.fileName, height = _a.height, width = _a.width;
    console.log('start', __dirname);
    if (fileName) {
        if (height && width) {
            var heightNum = Number(height);
            var widthNum = Number(width);
            if (!(isNaN(heightNum) || isNaN(widthNum))) {
                if (heightNum <= 0 || widthNum <= 0) {
                    console.log('invalid height & width', __dirname);
                    return res.status(404).send('please enter a valid height and width');
                }
                else {
                    console.log('valid height & width');
                    next();
                }
            }
            else {
                console.log('invalid height & width');
                return res.status(404).send('please enter a valid height and width');
            }
        }
        else {
            console.log('valid file name without height & width');
            next();
        }
    }
    else {
        console.log('no FileName found in prameters');
        return res.status(404).send('no FileName found in prameters');
    }
};
exports.validateFileName = validateFileName;
