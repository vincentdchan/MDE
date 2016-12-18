import * as child_process from "child_process"
import {remote} from "electron"
import * as fs from "fs"


export function initializeMarkdownTokenizerService() {
    let a = fs.openSync('err.out', 'w');
    let option: any = {
        stdio : [0, 1, 2, "ipc"],
    };
    let n = child_process.fork("./tokenizer_child", [], option);

    return n;
}


