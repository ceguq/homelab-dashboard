const DEFAULT_PASSWORD_HASH = "$2b$12$mcH1eNe9spxTdfS2eAr8c.zGq.yvEtiNlkVHnsUTSSgowOvlOMMiy";

export const users = [
  {
    username: process.env.DASHBOARD_USERNAME ?? "admin",
    passwordHash: process.env.DASHBOARD_PASSWORD_HASH ?? DEFAULT_PASSWORD_HASH,
  },
];
