"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reportPolicy_1 = require("./reportPolicy");
exports.config = {
    sdk_type: 'wphone',
    sdk_type_config: 'wp',
    sdk_version: '2.0.1',
    os: 'WINDOWSPHONE OS 8.0',
    send_log_url: ["http://www.umeng.com/app_logs", "http://www.umeng.co/app_logs"],
    send_update_url: ["http://www.umeng.com/api/check_app_update", "http://www.umeng.co/api/check_app_update"],
    send_config_url: ["http://www.umeng.com/check_config_update", "http://www.umeng.co/check_config_update"],
    setting_filename: 'umengSettings.json',
    appkey: '',
    channel: 'marketplace',
    appname: '',
    version: '',
    resolution: '',
    sessionInterval: 30,
    sessionId: '',
    Policy: reportPolicy_1.reportPolicy.BATCH_AT_LAUNCH,
};
//# sourceMappingURL=config.js.map