
const http = require("http");

const app = require("./app");

const { initializedSocket } = require("./socket.js");

const port = process.env.PORT ||3000

const server = http.createServer(app);

initializedSocket(server);

server.listen(port , ()=>{
  console.log(`server is running on port ${port}`);
});
