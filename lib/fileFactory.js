"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
const path = require("path");
const gsof_simple_file_async_1 = require("gsof-simple-file-async");
class fileFactory {
    static load(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePath = utility_1.pathEx.getPath(filename);
            const exists = yield gsof_simple_file_async_1.file.exists(filePath);
            if (!exists) {
                return {};
            }
            let text = yield gsof_simple_file_async_1.file.readAllText(filePath);
            return JSON.parse(text);
        });
    }
    static save(t, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let filepath = utility_1.pathEx.getPath(filename);
            let dir = path.dirname(filepath);
            const exists = yield gsof_simple_file_async_1.file.exists(dir);
            if (!exists) {
                yield gsof_simple_file_async_1.directory.createDirectory(dir);
            }
            yield gsof_simple_file_async_1.file.writeByJson(filepath, t);
        });
    }
}
exports.fileFactory = fileFactory;
//# sourceMappingURL=fileFactory.js.map