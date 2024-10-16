export const environment = {
    APP_CLIENT:{auth: {
        clientId: 'eb695b1b-68c0-471b-a942-9c85da7bfec0',
        authority: 'https://login.microsoftonline.com/4d24a5e1-43ac-47f2-8666-7018b13dec8a',
        // redirectUri: 'http://localhost:4200/',
        redirectUri:'https://powerbi-mu.vercel.app'
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
   },
    production: false,
};