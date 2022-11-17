"use strict";
exports.__esModule = true;
exports.Logger = void 0;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function (message) {
        console.info(message);
    };
    Logger.prototype.error = function (message) {
        console.error(message);
    };
    return Logger;
}());
exports.Logger = Logger;
