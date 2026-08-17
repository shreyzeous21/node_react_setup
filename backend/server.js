import { app } from "./app.js";
import { ENV } from "./lib/env.js";

import { createServer } from "http";
import { initSocket } from "./lib/socket.js";

const httpServer = createServer(app);

initSocket(httpServer);

httpServer.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
