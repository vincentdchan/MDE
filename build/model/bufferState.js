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
            this._is_modified = true;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9idWZmZXJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0QkFBdUMsYUFDdkMsQ0FBQyxDQURtRDtBQUNwRCx5QkFBMkIsUUFDM0IsQ0FBQyxDQURrQztBQUNuQyx1QkFBZ0MsU0FDaEMsQ0FBQyxDQUR3QztBQUN6QyxNQUFZLElBQUksV0FBTSxNQUV0QixDQUFDLENBRjJCO0FBRTVCO0lBS0ksWUFBWSxPQUFlLEVBQUUsT0FBZ0I7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0FBRUwsQ0FBQztBQWxCWSw0QkFBb0IsdUJBa0JoQyxDQUFBO0FBRUQ7SUFJSSxZQUFZLGdCQUF5QjtRQUNqQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDdEMsQ0FBQztBQUVMLENBQUM7QUFaWSwwQkFBa0IscUJBWTlCLENBQUE7QUFRRCwwQkFBaUMscUJBQVk7SUFTekMsWUFBWSxPQUFnQjtRQUN4QixPQUFPLENBQUM7UUFQSixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLGdCQUFXLEdBQWMsSUFBSSxDQUFDO1FBT2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXpCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLEdBQWtCO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JC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
