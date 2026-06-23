import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
    database: new Pool({
        // Switched back to the secure environment variable!
        connectionString: process.env.DATABASE_URL as string 
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        organization(), 
    ],
});