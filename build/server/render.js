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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvcmVuZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBMEI7QUFDMUIsaUNBQWdDO0FBRWhDLDRCQUEyQyxJQUFhO0lBQ3BELElBQUksR0FBRyxJQUFJLEdBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtJQUUxQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBa0I7UUFFN0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFZO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBVTtRQUN0QixNQUFNLEdBQUcsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNWLElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7S0FDbEIsRUFBQztRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7O0FBdEJELHFDQXNCQyIsImZpbGUiOiJzZXJ2ZXIvcmVuZGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
