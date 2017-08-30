import { config } from "./config";
import { pathEx } from "./utility";
import * as path from 'path';
import { file, directory } from "gsof-simple-file-async";

export class fileFactory {

    public static async load<T>(filename: string) {
        let filePath = pathEx.getPath(filename);
        const exists = await file.exists(filePath);
        if (!exists) {
            return <T>{};
        }
        let text = await file.readAllText(filePath);
        return <T>JSON.parse(text);
    }

    public static async save<T>(t: T, filename: string) {
        let filepath = pathEx.getPath(filename);
        let dir = path.dirname(filepath);
        const exists = await file.exists(dir);
        if (!exists) {
            await directory.createDirectory(dir);
        }
        await file.writeByJson(filepath, t);
    }
}