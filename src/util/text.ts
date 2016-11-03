import {StringBuffer} from "./stringBuffer"

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

    return lines;
}