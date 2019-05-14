interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '7Id4TTDkpIlCUK_cOSKUOu1OXh5FPnBv',
  domain: 'virtualvenue.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
