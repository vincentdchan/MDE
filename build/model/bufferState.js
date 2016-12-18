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
    readFileContentToModel(encoding = "utf8") {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._text_model === null) {
                let content = yield util_1.Host.readFile(this._abs_path, encoding);
                this.initTextModel(content);
                return true;
            }
            return false;
        });
    }
    writeContentToFile(path, encoding = "utf8") {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._text_model) {
                let content = this._text_model.reportAll();
                let result = yield util_1.Host.writeStringToFile(path, "utf8", content);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9idWZmZXJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0QkFBdUMsYUFDdkMsQ0FBQyxDQURtRDtBQUNwRCx5QkFBMkIsUUFDM0IsQ0FBQyxDQURrQztBQUNuQyx1QkFBZ0MsU0FDaEMsQ0FBQyxDQUR3QztBQUN6QyxNQUFZLElBQUksV0FBTSxNQUV0QixDQUFDLENBRjJCO0FBRTVCO0lBS0ksWUFBWSxPQUFlLEVBQUUsT0FBZ0I7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0FBRUwsQ0FBQztBQWxCWSw0QkFBb0IsdUJBa0JoQyxDQUFBO0FBRUQ7SUFJSSxZQUFZLGdCQUF5QjtRQUNqQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDdEMsQ0FBQztBQUVMLENBQUM7QUFaWSwwQkFBa0IscUJBWTlCLENBQUE7QUFRRCwwQkFBaUMscUJBQVk7SUFTekMsWUFBWSxPQUFnQjtRQUN4QixPQUFPLENBQUM7UUFQSixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLGdCQUFXLEdBQWMsSUFBSSxDQUFDO1FBT2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXpCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLEdBQWtCO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JC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QUFJLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0FBRUwsQ0FBQztBQXBHWSxtQkFBVyxjQW9HdkIsQ0FBQSIsImZpbGUiOiJtb2RlbC9idWZmZXJTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
