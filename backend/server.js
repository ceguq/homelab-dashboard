import { env, warnForUnsafeDefaults } from "./src/config/env.js";
import { createApp } from "./src/app.js";

warnForUnsafeDefaults();

const app = createApp();

app.listen(env.port, () => {
  console.log(`[server] Backend berjalan di http://localhost:${env.port}`);
});
