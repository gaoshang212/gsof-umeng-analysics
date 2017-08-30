import * as moment from "moment";
import { settingManager } from "./settings";

export class time {
    public date: string;
    public time: string;
    public session_id: string;

    /**
     *
     */
    constructor(sessionid?: string) {
        this.reset(new Date());
        this.session_id = sessionid;
    }

    public reset(date: Date) {
        this.date = moment(date).format('YYYY-MM-DD');
        this.time = moment(date).format('HH:mm:ss');
    }
}

export class launch extends time {
    constructor(sessionid: string) {
        super(sessionid);
    }
}

export class terminate extends time {
    public duration: number;
    public activities: any[];

    /**
     *
     */
    constructor(sessionid?: string) {
        super(sessionid);
        this.reset(settingManager.settings.lastpausetime);
        this.duration = settingManager.settings.duration;
        this.activities = this.getPaths();
    }

    private clear() {
        delete settingManager.settings.duration;
        delete settingManager.settings.sessionid;
        delete settingManager.settings.activities;
    }

    private getPaths() {
        let activities = settingManager.settings.activities;
        if (!activities || activities.length <= 0) {
            return [];
        }

        //todo get page paths 
        return [];
    }

    public static getlast() {
        let seesion = settingManager.settings.sessionid;
        if (!seesion) {
            return;
        }

        let t = new terminate(seesion);
        t.clear();

        return t;
    }
}

export interface body {
    launch?: launch[];
    terminate?: terminate[];
}

export interface header {
    appkey: string;
    channel: string;
    device_id: string;
    wp_device: string;
    wp_anid2: string;
    device_model: string;
    resolution: string;
    sdk_type: string;
    sdk_version: string;
    os: string;
    os_version: string;
    app_version: string;
    package: string;
    language: string;
    country: string;
    timezone: number;
    carrier: string;
    access: string;
}