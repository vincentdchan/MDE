"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const textModel_1 = require("./textModel");
const events_1 = require("events");
const util_1 = require("../util");
const Path = require("path");
class FileStateChanged extends Event {
    constructor(fileStateChanged) {
        super("fileStateChanged");
        this._file_state_changed = fileStateChanged;
    }
    get fileStateChanged() {
        return this._file_state_changed;
    }
}
exports.FileStateChanged = FileStateChanged;
class FileState extends events_1.EventEmitter {
    constructor(absPath) {
        super();
        this._filename = null;
        this._text_model = null;
        this._abs_path = absPath;
    }
    readFileContentToModel(encoding = "UTF-8") {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._text_model === null) {
                let content = yield util_1.Host.readFile(this._abs_path, encoding);
                this._text_model = new textModel_1.TextModel(content);
                this._text_model.on("textEdit", (evt) => {
                    if (!this._is_modified) {
                        this._is_modified = true;
                        let evt = new FileStateChanged(true);
                        this.emit("fileStateChanged", evt);
                    }
                });
                return true;
            }
            return false;
        });
    }
    get absolutePath() {
        return this._abs_path;
    }
    get filename() {
        if (!this._filename)
            this._filename = Path.basename(this._abs_path);
        return this._filename;
    }
    get isModified() {
        return this._is_modified;
    }
    get model() {
        return this._text_model;
    }
}
exports.FileState = FileState;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
