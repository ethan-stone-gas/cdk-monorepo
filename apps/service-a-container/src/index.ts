import Fastify from "fastify";
import { Logger } from "logger";

const logger = new Logger();

const server = Fastify({});

server.get("/ping", async () => {
  return { pong: "Hello World" };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    logger.info(`Server started on port ${port}`);
  } catch (err) {
    logger.error("Server start failed");
    process.exit(1);
  }
};

start();
