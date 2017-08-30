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
const fileFactory_1 = require("./fileFactory");
const config_1 = require("./config");
class settingManager {
    static get settings() {
        if (!this._settings) {
            this._settings = {};
        }
        return settingManager._settings;
    }
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = yield fileFactory_1.fileFactory.load(config_1.config.setting_filename);
            this._settings = settings || {};
        });
    }
    static save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fileFactory_1.fileFactory.save(this.settings, config_1.config.setting_filename);
        });
    }
}
exports.settingManager = settingManager;
//# sourceMappingURL=settings.js.map