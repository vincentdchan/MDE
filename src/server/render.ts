import * as net from "net"
import * as marked from "marked"

export default function createRenderServer(port?: number) {
    port = port  ? port : 7085

    let server = net.createServer((socket: net.Socket) => {

        socket.on("data", (data: Buffer) => {
            socket.end(marked(data.toString()));
        });

    }).on("error", (err: Error) => {
        throw err;
    });

    server.listen({
        host: "localhost",
        port: port,
        exclusive: true
    },() =>{
        console.log("opened server on", server.address());
    });

    return server;
}
