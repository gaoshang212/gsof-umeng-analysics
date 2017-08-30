"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const settings_1 = require("./settings");
class time {
    /**
     *
     */
    constructor(sessionid) {
        this.reset(new Date());
        this.session_id = sessionid;
    }
    reset(date) {
        this.date = moment(date).format('YYYY-MM-DD');
        this.time = moment(date).format('HH:mm:ss');
    }
}
exports.time = time;
class launch extends time {
    constructor(sessionid) {
        super(sessionid);
    }
}
exports.launch = launch;
class terminate extends time {
    /**
     *
     */
    constructor(sessionid) {
        super(sessionid);
        this.reset(settings_1.settingManager.settings.lastpausetime);
        this.duration = settings_1.settingManager.settings.duration;
        this.activities = this.getPaths();
    }
    clear() {
        delete settings_1.settingManager.settings.duration;
        delete settings_1.settingManager.settings.sessionid;
        delete settings_1.settingManager.settings.activities;
    }
    getPaths() {
        let activities = settings_1.settingManager.settings.activities;
        if (!activities || activities.length <= 0) {
            return [];
        }
        //todo get page paths 
        return [];
    }
    static getlast() {
        let seesion = settings_1.settingManager.settings.sessionid;
        if (!seesion) {
            return;
        }
        let t = new terminate(seesion);
        t.clear();
        return t;
    }
}
exports.terminate = terminate;
//# sourceMappingURL=models.js.map