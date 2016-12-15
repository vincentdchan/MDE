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
class BufferAbsPathChanged extends Event {
    constructor(newPath, oldPath) {
        super("bufferAbsPathChanged");
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
class BufferStateChanged extends Event {
    constructor(fileStateChanged) {
        super("bufferStateChanged");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9idWZmZXJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0QkFBdUMsYUFDdkMsQ0FBQyxDQURtRDtBQUNwRCx5QkFBMkIsUUFDM0IsQ0FBQyxDQURrQztBQUNuQyx1QkFBZ0MsU0FDaEMsQ0FBQyxDQUR3QztBQUN6QyxNQUFZLElBQUksV0FBTSxNQUV0QixDQUFDLENBRjJCO0FBRTVCLG1DQUEwQyxLQUFLO0lBSzNDLFlBQVksT0FBZSxFQUFFLE9BQWdCO1FBQ3pDLE1BQU0sc0JBQXNCLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7QUFFTCxDQUFDO0FBcEJZLDRCQUFvQix1QkFvQmhDLENBQUE7QUFFRCxpQ0FBd0MsS0FBSztJQUl6QyxZQUFZLGdCQUF5QjtRQUNqQyxNQUFNLG9CQUFvQixDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLGtCQUFrQjtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0lBQ3RDLENBQUM7QUFFTCxDQUFDO0FBZFksMEJBQWtCLHFCQWM5QixDQUFBO0FBUUQsMEJBQWlDLHFCQUFZO0lBU3pDLFlBQVksT0FBZ0I7UUFDeEIsT0FBTyxDQUFDO1FBUEosY0FBUyxHQUFXLElBQUksQ0FBQztRQUV6QixnQkFBVyxHQUFjLElBQUksQ0FBQztRQU9sQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUV6QixJQUFJLENBQUMsd0JB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
