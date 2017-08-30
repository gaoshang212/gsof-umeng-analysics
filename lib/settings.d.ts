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
export declare class settingManager {
    private static _settings;
    static readonly settings: settings;
    static load(): Promise<void>;
    static save(): Promise<void>;
}
