"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const crypto = require("crypto");
const path = require("path");
const appdata_path_1 = require("appdata-path");
class pathEx {
    static getPath(filename) {
        let key = pathEx.key;
        if (!key) {
            pathEx.key = key = utility.getMd5(config_1.config.appkey + config_1.config.channel);
        }
        return path.join(appdata_path_1.getAppDataPath(), 'umeng', key, filename);
    }
}
exports.pathEx = pathEx;
class utility {
    static getMd5(content) {
        let md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex').toUpperCase();
    }
}
exports.utility = utility;
class task {
    static delay(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve) => {
                setTimeout(function () {
                    resolve();
                }, timeout);
            });
            return promise;
        });
    }
}
exports.task = task;
//# sourceMappingURL=utility.js.map