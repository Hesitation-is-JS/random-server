const PORT = Number(process.env.PORT);

const server = Bun.serve({
  port: PORT,
  fetch(req: Request) {
    return new Response(`Bun!`);
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
