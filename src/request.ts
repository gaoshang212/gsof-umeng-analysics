import { http } from "gsof-simple-async-http";

export class request {

    public static async send<T>(urls: string[], t: T) {
        for (let url of urls) {
            try {
                return await http.json(url, { method: 'post', headers: { 'X-Umeng-Sdk': 'windowsphone/1.0' }, params: { content: JSON.stringify(t) } })
            } catch (e) { }
        }
    }
}