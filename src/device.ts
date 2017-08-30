import { getSystemToken } from "gsof-system-token";
import { settingManager } from "./settings";

export class device {

    public static async getDeviceId() {
        let deviceid = settingManager.settings.deviceid;
        if (!deviceid) {
            deviceid = settingManager.settings.deviceid = await getSystemToken();
        }
        return deviceid.toUpperCase();
    }
}