import { createAuth0 } from "@auth0/auth0-vue";

export const auth0 = createAuth0({
  domain: "dev-yhfol7bv57at5lsp.au.auth0.com",
  clientId: "7SDSXxa7oyP8XNcRKnYnyXcXBOlfh8ZY",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: "https://api.charlie.app",
  },
  cacheLocation: "localstorage",
});
