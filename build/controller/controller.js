"use strict";
const events_1 = require("events");
class Controller extends events_1.EventEmitter {
    constructor(_model) {
        super();
        this._model = _model;
        this._model.on("insert", (e) => {
            setImmediate(() => {
                this.handleTextInsert(e);
            });
        });
        this._model.on("delete", (e) => {
            setImmediate(() => {
                this.handleTextDelete(e);
            });
        });
    }
    handleTextInsert(e) {
    }
    handleTextDelete(e) {
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHlCQUEyQixRQUUzQixDQUFDLENBRmtDO0FBRW5DLHlCQUF5QixxQkFBWTtJQUlqQyxZQUFZLE1BQWtCO1FBQzFCLE9BQU8sQ0FBQztRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQW9CO1lBQzFDLFlBQVksQ0FBQztnQkFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQW9CO1lBQzFDLFlBQVksQ0FBQztnQkFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxDQUFvQjtJQUU3QyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsQ0FBb0I7SUFFN0MsQ0FBQztBQUVMLENBQUM7QUFBQSIsImZpbGUiOiJjb250cm9sbGVyL2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
