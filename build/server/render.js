"use strict";
const net = require("net");
const marked = require("marked");
function createRenderServer(port) {
    port = port ? port : 7085;
    let server = net.createServer((socket) => {
        socket.on("data", (data) => {
            socket.end(marked(data.toString()));
        });
    }).on("error", (err) => {
        throw err;
    });
    server.listen({
        host: "localhost",
        port: port,
        exclusive: true
    }, () => {
        console.log("opened server on", server.address());
    });
    return server;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRenderServer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvcmVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLEdBQUcsV0FBTSxLQUNyQixDQUFDLENBRHlCO0FBQzFCLE1BQVksTUFBTSxXQUFNLFFBRXhCLENBQUMsQ0FGK0I7QUFFaEMsNEJBQTJDLElBQWE7SUFDcEQsSUFBSSxHQUFHLElBQUksR0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBRTFCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFrQjtRQUU3QyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQVk7WUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFVO1FBQ3RCLE1BQU0sR0FBRyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ1YsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLElBQUk7UUFDVixTQUFTLEVBQUUsSUFBSTtLQUNsQixFQUFDO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQXRCRDtvQ0FzQkMsQ0FBQSIsImZpbGUiOiJzZXJ2ZXIvcmVuZGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
