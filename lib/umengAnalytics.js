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
const utility_1 = require("./utility");
const settings_1 = require("./settings");
const gsof_simple_file_async_1 = require("gsof-simple-file-async");
const models_1 = require("./models");
const reportPolicy_1 = require("./reportPolicy");
const request_1 = require("./request");
const device_1 = require("./device");
const os = require("os");
class umengAnalytics {
    launching() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setBodyFileName();
            yield this.resume();
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = settings_1.settingManager.settings;
            let now = new Date();
            settings.lastpausetime = now;
            settings.sessionid = config_1.config.sessionId;
            if (!settings.duration) {
                settings.duration = 0;
            }
            settings.duration += Math.round(((now.getTime() - this.resumetime.getTime()) / 1000));
            yield settings_1.settingManager.save();
        });
    }
    resume() {
        return __awaiter(this, void 0, void 0, function* () {
            this.resumetime = new Date();
            if (!this.hasNewSession()) {
                return;
            }
            let session = config_1.config.sessionId = yield this.createSessionId();
            let l = new models_1.launch(session);
            let t = models_1.terminate.getlast();
            if (config_1.config.Policy === reportPolicy_1.reportPolicy.BATCH_AT_LAUNCH) {
                yield this.sendCacheMessage(l, t);
            }
        });
    }
    initialize(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                return;
            }
            if (!opts.appkey) {
                console.log('Invalid app key!');
                return;
            }
            if (opts.channel && opts.channel.length > umengAnalytics.MAX_LENGTH) {
                opts.channel = opts.channel.substr(umengAnalytics.MAX_LENGTH);
            }
            Object.assign(config_1.config, opts);
            console.log(config_1.config);
            yield settings_1.settingManager.load();
            console.log(settings_1.settingManager.settings);
        });
    }
    setBodyFileName() {
        return __awaiter(this, void 0, void 0, function* () {
            let appver = config_1.config.version.replace(/\./g, '_');
            let filename = utility_1.pathEx.getPath(appver);
            let bodyfilename = settings_1.settingManager.settings.bodyfilename;
            if (bodyfilename && bodyfilename !== filename) {
                if (yield gsof_simple_file_async_1.file.exists(bodyfilename)) {
                    yield gsof_simple_file_async_1.file.delete(bodyfilename);
                }
            }
            settings_1.settingManager.settings.bodyfilename = filename;
        });
    }
    hasNewSession() {
        let pausetime = settings_1.settingManager.settings.lastpausetime;
        let now = new Date();
        if (!pausetime || !now) {
            return true;
        }
        if (typeof pausetime === 'string') {
            pausetime = new Date(pausetime);
        }
        if (now.getTime() - pausetime.getTime() > config_1.config.sessionInterval) {
            return true;
        }
        return false;
    }
    createSessionId() {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield device_1.device.getDeviceId();
            return utility_1.utility.getMd5(config_1.config.appkey + Date.now() + token);
        });
    }
    createHeader() {
        return __awaiter(this, void 0, void 0, function* () {
            let header = {
                appkey: config_1.config.appkey,
                channel: config_1.config.channel,
                device_id: yield device_1.device.getDeviceId(),
                wp_device: yield device_1.device.getDeviceId(),
                wp_anid2: '1234567890',
                device_model: '',
                resolution: config_1.config.resolution,
                sdk_type: 'wphone',
                sdk_version: '2.0.1',
                os: 'WINDOWSPHONE OS 8.0',
                os_version: os.release(),
                app_version: config_1.config.version,
                package: 'unknow',
                language: 'zh',
                country: 'CN',
                timezone: new Date().getTimezoneOffset() / 60,
                carrier: '',
                access: 'Ethernet'
            };
            return header;
        });
    }
    sendCacheMessage(launch, terminate) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {};
            if (launch) {
                body.launch = [launch];
            }
            if (terminate) {
                body.terminate = [terminate];
            }
            let header = yield this.createHeader();
            let result = yield request_1.request.send(config_1.config.send_log_url, { body, header });
            console.log(result);
        });
    }
}
umengAnalytics.MAX_LENGTH = 30;
exports.umengAnalytics = umengAnalytics;
//# sourceMappingURL=umengAnalytics.js.map