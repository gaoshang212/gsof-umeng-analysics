"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reportPolicy;
(function (reportPolicy) {
    reportPolicy[reportPolicy["REALTIME"] = 0] = "REALTIME";
    reportPolicy[reportPolicy["BATCH_AT_LAUNCH"] = 1] = "BATCH_AT_LAUNCH";
    reportPolicy[reportPolicy["BATCH_AT_TERMINATE"] = 2] = "BATCH_AT_TERMINATE";
    reportPolicy[reportPolicy["PUSH"] = 3] = "PUSH";
    reportPolicy[reportPolicy["DAILY"] = 4] = "DAILY";
    reportPolicy[reportPolicy["WIFIONLY"] = 5] = "WIFIONLY";
    reportPolicy[reportPolicy["INTERVAL"] = 6] = "INTERVAL";
})(reportPolicy = exports.reportPolicy || (exports.reportPolicy = {}));
//# sourceMappingURL=reportPolicy.js.map