import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // This points the frontend to your local server
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" 
})