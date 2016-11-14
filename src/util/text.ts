import {StringBuffer} from "./stringBuffer"

// if last char is '\n' then will add a "" into the Array
export function parseTextToLines(content: string) : string[] {
    var lines = new Array<string>();
    
    var buf = new StringBuffer();

    if (content.length == 0) {
        lines.push("");
    } else {
        for (let i = 0; i < content.length; ++i) {
            if (content[i] === '\n') {
                if (content[i + 1] === '\r') {
                    ++i;
                }
                
                buf.push('\n');
                lines.push(buf.getStr());
                buf = new StringBuffer();
            } else if (content[i] === '\r') {
                if (content[i + 1] == '\n') {
                    ++i;
                }
                buf.push('\n');
                lines.push(buf.getStr());
                buf = new StringBuffer();
            } else {
                buf.push(content.charAt(i))
            }
        }
        
        // push remain buffer
        if (buf.length > 0) {
            lines.push(buf.getStr());
            buf = null;
        }
    }

    if (lines.length > 0) {
        let lastLine = lines[lines.length - 1];
        if (lastLine[lastLine.length - 1] == "\n") {
            lines.push("");
        }
    }

    return lines;
}