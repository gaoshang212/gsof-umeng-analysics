import { iUmengAnalytics } from './iumengAnalytics';
export interface umengOptions {
    appname: string;
    version: string;
    appkey: string;
    channel: string;
    resolution: string;
}
export declare class umengAnalytics implements iUmengAnalytics {
    static MAX_LENGTH: number;
    private initialized;
    private options;
    private resumetime;
    launching(): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    initialize(opts: umengOptions): Promise<void>;
    private setBodyFileName();
    private hasNewSession();
    private createSessionId();
    private createHeader();
    private sendCacheMessage(launch, terminate);
}
