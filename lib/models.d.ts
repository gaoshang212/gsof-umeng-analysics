export declare class time {
    date: string;
    time: string;
    session_id: string;
    /**
     *
     */
    constructor(sessionid?: string);
    reset(date: Date): void;
}
export declare class launch extends time {
    constructor(sessionid: string);
}
export declare class terminate extends time {
    duration: number;
    activities: any[];
    /**
     *
     */
    constructor(sessionid?: string);
    private clear();
    private getPaths();
    static getlast(): terminate;
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
