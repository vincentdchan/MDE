import {TextModel, TextChangedEvent, TextChangedType} from "../model/textModel"
import {EventEmitter} from "events"

class Controller extends EventEmitter {

    private _model : TextModel;

    constructor(_model : TextModel) {
        super();

        this._model = _model;

        this._model.on("insert", (e : TextChangedEvent) => {
            setImmediate(() => {
                this.handleTextInsert(e);
            });
        })

        this._model.on("delete", (e : TextChangedEvent) => {
            setImmediate(() => {
                this.handleTextDelete(e);
            })
        })
    }

    private handleTextInsert(e : TextChangedEvent) {

    }

    private handleTextDelete(e : TextChangedEvent) {

    }

}
