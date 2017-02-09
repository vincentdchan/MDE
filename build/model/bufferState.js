"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9idWZmZXJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBb0Q7QUFDcEQsbUNBQW1DO0FBQ25DLGtDQUF5QztBQUN6Qyw2QkFBNEI7QUFDNUIseUJBQXdCO0FBRXhCO0lBS0ksWUFBWSxPQUFlLEVBQUUsT0FBZ0I7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0NBRUo7QUFsQkQsb0RBa0JDO0FBRUQ7SUFJSSxZQUFZLGdCQUF5QjtRQUNqQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDdEMsQ0FBQztDQUVKO0FBWkQsZ0RBWUM7QUFRRCxpQkFBeUIsU0FBUSxxQkFBWTtJQVN6QyxZQUFZLE9BQWdCO1FBQ3hCLEtBQUssRUFBRSxDQUFDO1FBUEosY0FBUyxHQUFXLElBQUksQ0FBQztRQUV6QixnQkFBVyxHQUFjLElBQUksQ0FBQztRQU9sQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUV6QixJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxHQUFrQjtZQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFFekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFD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QUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0NBRUo7QUFqSUQsa0NBaUlDIiwiZmlsZSI6Im1vZGVsL2J1ZmZlclN0YXRlLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
