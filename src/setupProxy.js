//const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
//   app.use(
//     createProxyMiddleware("/index", {
//       target: "https://m.juooo.com",
//       changeOrigin: true, // needed for virtual hosted sites
//       //ws: true, // proxy websockets
//       // pathRewrite: {
          
//       //   "^/api": ""
//       // }
//     })
//   );
//'https://login.microsoftonline.com/d20a93a7-2e43-4f9a-83fa-f6269fae4045/oauth2/token';
  app.use(
    createProxyMiddleware("/oauth2", {
      target: "https://login.microsoftonline.com/d20a93a7-2e43-4f9a-83fa-f6269fae4045",
      changeOrigin: true, // needed for virtual hosted sites
      // headers:{
      //   "Access-Control-Allow-Origin": "*",
      // },
      //autoRewrite:true,
      //hostRewrite:"https://login.microsoftonline.com/d20a93a7-2e43-4f9a-83fa-f6269fae4045/oauth2/authorize?response_type=code+id_token&redirect_uri=https%3A%2F%2Ffunctionappauthtest-yizhou-1.azurewebsites.net%2F.auth%2Flogin%2Faad%2Fcallback&client_id=633fccb6-7fcd-42d5-9d6c-2797f18e57a8&scope=openid+profile+email&response_mode=form_post&nonce=bdce8f2eb83640cb83638586e8a8ae14_20200701023023&state=redir%3D%252Fapi%252FADFunctionApp&sso_reload=true"
    //   ws: true, // proxy websockets
    //   pathRewrite: {
          
    //     "^/api": ""
    //   }
    })
  );
  
  app.use(
    createProxyMiddleware("/api", {
      target: "https://functionappauthtest-yizhou-1.azurewebsites.net",
      changeOrigin: true, // needed for virtual hosted sites
      // headers:{
      //   "Access-Control-Allow-Origin": "*",
      // },
      //autoRewrite:true,
      //hostRewrite:"https://login.microsoftonline.com/d20a93a7-2e43-4f9a-83fa-f6269fae4045/oauth2/authorize?response_type=code+id_token&redirect_uri=https%3A%2F%2Ffunctionappauthtest-yizhou-1.azurewebsites.net%2F.auth%2Flogin%2Faad%2Fcallback&client_id=633fccb6-7fcd-42d5-9d6c-2797f18e57a8&scope=openid+profile+email&response_mode=form_post&nonce=bdce8f2eb83640cb83638586e8a8ae14_20200701023023&state=redir%3D%252Fapi%252FADFunctionApp&sso_reload=true"
    //   ws: true, // proxy websockets
    //   pathRewrite: {
          
    //     "^/api": ""
    //   }
    })
  );


};