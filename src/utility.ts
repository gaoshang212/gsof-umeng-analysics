import { manager } from "./manager";
import * as crypto from "crypto";
import * as path from 'path';
import { getAppDataPath } from "appdata-path";

export class pathEx {
    static key: string;

    public static getPath(filename: string): string {
        let key = pathEx.key;
        if (!key) {
            pathEx.key = key = utility.getMd5(manager.appkey + manager.channel);
        }

        return path.join(getAppDataPath(), 'umeng', key, filename);
    }
}

export class utility {
    public static getMd5(content): string {
        let md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex').toUpperCase();
    }
}

export class task {
    public static async delay(timeout: number): Promise<void> {
        let promise = new Promise<void>((resolve) => {
            setTimeout(function () {
                resolve();
            }, timeout);
        });
        return promise;
    }
}
