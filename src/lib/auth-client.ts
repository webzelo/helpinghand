import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

// No baseURL on purpose: better-auth defaults to `window.location.origin`, so
// the client always talks to the host it was served from (localhost, a Vercel
// preview, or production). Hard-coding an origin breaks every other host
// because the session cookie would be issued for the wrong domain.
export const authClient = createAuthClient({
    plugins: [
        jwtClient()
    ],
})