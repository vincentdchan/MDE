"use strict";
class FixSizeStack {
    constructor(_fix_size) {
        this._size = 0;
        this._frame_begin = 0;
        this._frame_end = 0;
        this._capacity = 64;
        this._fix_size = _fix_size;
        this._arr = [];
        this._arr.length = this._capacity;
    }
    realloc(size) {
        this._arr.length = size;
    }
    push(obj) {
        if (this._frame_end == this._capacity) {
            this._capacity *= 2;
            this.realloc(this._capacity);
        }
        this._arr[this._frame_end++] = obj;
        if (this._frame_end - this._frame_begin > this._fix_size) {
            this._frame_begin = this._frame_begin - this._fix_size;
            if (this._frame_begin >= this._capacity) {
                let shit = this._arr.slice(0, this._frame_begin);
                this._arr = this._arr.slice(this._frame_begin);
                this._capacity = this._arr.length;
                this._frame_end = this._frame_end - this._frame_begin;
                this._frame_begin = 0;
            }
        }
    }
    pop() {
        if (this._frame_begin == this._frame_end)
            throw new Error("The stack is empty.");
        if (this._frame_end <= this._capacity / 4) {
            this._capacity /= 2;
            this.realloc(this._capacity);
        }
        return this._arr[--this._frame_end];
    }
    size() {
        return this._frame_end - this._frame_begin;
    }
    empty() {
        return this._frame_begin == this._frame_end;
    }
}
exports.FixSizeStack = FixSizeStack;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFVQTtJQVNJLFlBQVksU0FBaUI7UUFOckIsVUFBSyxHQUFZLENBQUMsQ0FBQztRQUNuQixpQkFBWSxHQUFZLENBQUMsQ0FBQztRQUMxQixlQUFVLEdBQVksQ0FBQyxDQUFDO1FBQ3hCLGNBQVMsR0FBWSxFQUFFLENBQUM7UUFJNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFFTyxPQUFPLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFNO1FBRVAsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUVsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDdEQsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsR0FBRztRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxJQUFJO1FBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMvQyxDQUFDO0lBRUQsS0FBSztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDaEQsQ0FBQztBQUVMLENBQUM7QUE3RFksb0JBQVksZUE2RHhCLENBQUEiLCJmaWxlIjoidXRpbC9zdGFjay5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
