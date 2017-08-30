import { iUmengAnalytics } from './iumengAnalytics'
import { config } from "./config";
import { pathEx, utility } from "./utility";
import { settingManager } from "./settings";
import { file } from "gsof-simple-file-async";
import { launch, terminate, body, header } from "./models";
import { reportPolicy } from "./reportPolicy";
import { request } from "./request";
import { device } from "./device";
import * as os from "os";



export interface umengOptions {
    appname: string;
    version: string;
    appkey: string;
    channel: string;
    resolution: string;
}

export class umengAnalytics implements iUmengAnalytics {
    static MAX_LENGTH = 30;
    private initialized: boolean;
    private options: umengOptions;
    private resumetime: Date;

    public async launching() {
        await this.setBodyFileName();
        await this.resume();
    }
    public async pause() {
        let settings = settingManager.settings;
        let now = new Date();
        settings.lastpausetime = now;
        settings.sessionid = config.sessionId;

        if (!settings.duration) {
            settings.duration = 0;
        }
        settings.duration += Math.round(((now.getTime() - this.resumetime.getTime()) / 1000));

        await settingManager.save();
    }

    public async resume() {
        this.resumetime = new Date();

        if (!this.hasNewSession()) {
            return;
        }

        let session = config.sessionId = await this.createSessionId();
        let l = new launch(session);
        let t = terminate.getlast();

        if (config.Policy === reportPolicy.BATCH_AT_LAUNCH) {
            await this.sendCacheMessage(l, t);
        }
    }

    public async initialize(opts: umengOptions) {
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

        Object.assign(config, opts);
        console.log(config);
        await settingManager.load();
        console.log(settingManager.settings);
    }

    private async setBodyFileName() {
        let appver = config.version.replace(/\./g, '_');
        let filename = pathEx.getPath(appver);

        let bodyfilename = settingManager.settings.bodyfilename;
        if (bodyfilename && bodyfilename !== filename) {
            if (await file.exists(bodyfilename)) {
                await file.delete(bodyfilename);
            }
        }

        settingManager.settings.bodyfilename = filename;
    }

    private hasNewSession() {
        let pausetime = settingManager.settings.lastpausetime;
        let now = new Date();
        if (!pausetime || !now) {
            return true;
        }

        if (typeof pausetime === 'string') {
            pausetime = new Date(pausetime);
        }

        if (now.getTime() - pausetime.getTime() > config.sessionInterval) {
            return true;
        }

        return false;
    }

    private async createSessionId(): Promise<string> {
        let token = await device.getDeviceId();
        return utility.getMd5(config.appkey + Date.now() + token);
    }

    private async createHeader(): Promise<header> {
        let header: header = {
            appkey: config.appkey,
            channel: config.channel,
            device_id: await device.getDeviceId(),
            wp_device: await device.getDeviceId(),
            wp_anid2: '1234567890',
            device_model: '',
            resolution: config.resolution,
            sdk_type: 'wphone',
            sdk_version: '2.0.1',
            os: 'WINDOWSPHONE OS 8.0',
            os_version: os.release(),
            app_version: config.version,
            package: 'unknow',
            language: 'zh',
            country: 'CN',
            timezone: new Date().getTimezoneOffset() / 60,
            carrier: '',
            access: 'Ethernet'
        }

        return header;
    }

    private async sendCacheMessage(launch: launch, terminate: terminate) {
        let body: body = {};
        if (launch) {
            body.launch = [launch];
        }
        if (terminate) {
            body.terminate = [terminate];
        }

        let header = await this.createHeader();
        let result = await request.send(config.send_log_url, { body, header });
        console.log(result);
    }
}