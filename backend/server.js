import { app } from "./app.js";
import { ENV } from "./lib/env.js";

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
