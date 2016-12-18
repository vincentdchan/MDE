"use strict";
const child_process = require("child_process");
const fs = require("fs");
function initializeMarkdownTokenizerService() {
    let a = fs.openSync('err.out', 'w');
    let option = {
        stdio: [0, 1, 2, "ipc"],
    };
    let n = child_process.fork("./tokenizer_child", [], option);
    return n;
}
exports.initializeMarkdownTokenizerService = initializeMarkdownTokenizerService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvdG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLGFBQWEsV0FBTSxlQUMvQixDQUFDLENBRDZDO0FBRTlDLE1BQVksRUFBRSxXQUFNLElBR3BCLENBQUMsQ0FIdUI7QUFHeEI7SUFDSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxJQUFJLE1BQU0sR0FBUTtRQUNkLEtBQUssRUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztLQUMzQixDQUFDO0lBQ0YsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFNUQsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUM7QUFSZSwwQ0FBa0MscUNBUWpELENBQUEiLCJmaWxlIjoic2VydmVyL3Rva2VuaXplci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
