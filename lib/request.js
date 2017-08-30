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
const gsof_simple_async_http_1 = require("gsof-simple-async-http");
class request {
    static send(urls, t) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let url of urls) {
                try {
                    return yield gsof_simple_async_http_1.http.json(url, { method: 'post', headers: { 'X-Umeng-Sdk': 'windowsphone/1.0' }, params: { content: JSON.stringify(t) } });
                }
                catch (e) { }
            }
        });
    }
}
exports.request = request;
//# sourceMappingURL=request.js.map