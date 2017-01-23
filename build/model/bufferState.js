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
const fs = require("fs");
class BufferAbsPathChanged {
    constructor(newPath, oldPath) {
        this._newPath = newPath;
        this._oldPath = oldPath;
    }
    get newPath() {
        return this._newPath;
    }
    get oldPath() {
        return this._oldPath;
    }
}
exports.BufferAbsPathChanged = BufferAbsPathChanged;
class BufferStateChanged {
    constructor(fileStateChanged) {
        this._buffer_state_changed = fileStateChanged;
    }
    get bufferStateChanged() {
        return this._buffer_state_changed;
    }
}
exports.BufferStateChanged = BufferStateChanged;
class BufferState extends events_1.EventEmitter {
    constructor(absPath) {
        super();
        this._filename = null;
        this._text_model = null;
        this._abs_path = absPath;
        this._textModelChangedHandler = (evt) => {
            if (!this._is_modified) {
                this._is_modified = true;
                let evt = new BufferStateChanged(true);
                this.emit("bufferStateChanged", evt);
            }
        };
        if (!this._abs_path) {
            this.initTextModel("");
            this._is_modified = false;
            setTimeout(() => {
                let evt = new BufferStateChanged(true);
                this.emit("bufferStateChanged", evt);
            }, 10);
        }
    }
    initTextModel(content) {
        this._text_model = new textModel_1.TextModel(content);
        this._text_model.on("textEdit", this._textModelChangedHandler);
    }
    readFileContentToModel(encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            encoding = encoding ? encoding : "utf8";
            if (this._text_model === null) {
                let content = yield util_1.Host.readFile(this._abs_path, encoding);
                this.initTextModel(content);
                return true;
            }
            return false;
        });
    }
    readFileContentToModelSync(encoding) {
        encoding = encoding ? encoding : "utf8";
        if (this._text_model === null) {
            let content = fs.readFileSync(this._abs_path, encoding);
            this.initTextModel(content);
            return true;
        }
        return false;
    }
    writeContentToFile(path, encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            encoding = encoding ? encoding : "utf8";
            if (this._text_model) {
                let content = this._text_model.reportAll();
                let result = yield util_1.Host.writeStringToFile(path, encoding, content);
                if (result) {
                    this._is_modified = false;
                    let evt = new BufferStateChanged(false);
                    this.emit("bufferStateChanged", evt);
                    return true;
                }
            }
            return false;
        });
    }
    syncWriteContentToFile(path, encoding) {
        encoding = encoding ? encoding : "utf8";
        if (this._text_model) {
            let content = this._text_model.reportAll();
            fs.writeFileSync(path, content, {
                encoding: encoding
            });
            this._is_modified = false;
            let evt = new BufferStateChanged(false);
            this.emit("bufferStateChanged", evt);
            return true;
        }
        return false;
    }
    detachTextModel() {
        if (this._text_model) {
            this._text_model.removeListener("textEdit", this._textModelChangedHandler);
            this._text_model = null;
        }
    }
    dispose() {
        this.detachTextModel();
    }
    set absolutePath(path) {
        this._filename = null;
        this._abs_path = path;
        let evt = new BufferAbsPathChanged(path, this._abs_path);
        this.emit("bufferAbsPathChanged", evt);
    }
    get absolutePath() {
        return this._abs_path;
    }
    get filename() {
        if (!this._abs_path)
            return "untitled";
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
exports.BufferState = BufferState;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9idWZmZXJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0QkFBdUMsYUFDdkMsQ0FBQyxDQURtRDtBQUNwRCx5QkFBMkIsUUFDM0IsQ0FBQyxDQURrQztBQUNuQyx1QkFBZ0MsU0FDaEMsQ0FBQyxDQUR3QztBQUN6QyxNQUFZLElBQUksV0FBTSxNQUN0QixDQUFDLENBRDJCO0FBQzVCLE1BQVksRUFBRSxXQUFNLElBRXBCLENBQUMsQ0FGdUI7QUFFeEI7SUFLSSxZQUFZLE9BQWUsRUFBRSxPQUFnQjtRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7QUFFTCxDQUFDO0FBbEJZLDRCQUFvQix1QkFrQmhDLENBQUE7QUFFRDtJQUlJLFlBQVksZ0JBQXlCO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUN0QyxDQUFDO0FBRUwsQ0FBQztBQVpZLDBCQUFrQixxQkFZOUIsQ0FBQTtBQVFELDBCQUFpQyxxQkFBWTtJQVN6QyxZQUFZLE9BQWdCO1FBQ3hCLE9BQU8sQ0FBQztRQVBKLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFFekIsZ0JBQVcsR0FBYyxJQUFJLENBQUM7UUFPbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFFekIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsR0FBa0I7WUFDL0MsRUFBRSxDQUFDLENBQUMsQ0FB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SUFBSSxHQUFHLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztBQUVMLENBQUM7QUFqSVksbUJBQVcsY0FpSXZCLENBQUEiLCJmaWxlIjoibW9kZWwvYnVmZmVyU3RhdGUuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
