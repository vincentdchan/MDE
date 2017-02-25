"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = createRenderServer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvcmVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQTBCO0FBQzFCLGlDQUFnQztBQUVoQyw0QkFBMkMsSUFBYTtJQUNwRCxJQUFJLEdBQUcsSUFBSSxHQUFJLElBQUksR0FBRyxJQUFJLENBQUE7SUFFMUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQWtCO1FBRTdDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBWTtZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVU7UUFDdEIsTUFBTSxHQUFHLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDVixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLEVBQUM7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBdEJELHFDQXNCQyIsImZpbGUiOiJzZXJ2ZXIvcmVuZGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
