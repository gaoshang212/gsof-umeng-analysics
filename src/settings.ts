import { fileFactory } from "./fileFactory";
import { config } from "./config";

export interface settings {
    /**
     * 硬件id
     */
    deviceid?: string;
    /**
     * wp硬件id
     */
    wpdevice?: string;

    /**
     * body 文件位置
     */
    bodyfilename?: string;

    /**
     * 最后报告时间
     */
    lastreporttime?: Date;

    /**
     * 最后暂停时间
     */
    lastpausetime?: Date;

    /**
     * sessionid
     */
    sessionid?: string;

    /**
     * 时长
     */
    duration?: number;

    activities?: any[];
}

export class settingManager {
    private static _settings: settings;
    public static get settings() {
        if (!this._settings) {
            this._settings = {};
        }
        return settingManager._settings;
    }

    public static async load() {
        let settings = await fileFactory.load<settings>(config.setting_filename);
        this._settings = settings || {};
    }

    public static async save() {
        await fileFactory.save<settings>(this.settings, config.setting_filename);
    }

}
