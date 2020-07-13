import request from 'request'
import axios from "axios"
import qs from "qs"
import { oauth2, openPopup, pollPopup } from './helper'

// Sign in with Facebook
export function facebookLogin(facebook) {
    return oauth2(facebook)
        .then(openPopup)
        .then(pollPopup)
        .then(exchangeFacebookCodeForToken)
        .then(signIn)
        .then(closePopup);
}


function exchangeFacebookCodeForToken({ oauthData, config, window, interval }) {
    return new Promise((resolve, reject) => {
        const data = Object.assign({}, oauthData, config);

        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + data.scope;

        var params = {
            code: data.code,
            client_id: data.clientId,
            client_secret: data.clientSecret,
            redirect_uri: data.redirectUri
        };
        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params, json: true }, function (err, response, accessToken) {
            if (accessToken.error) {
                reject({ response });
            }
            // Step 2. Retrieve user's profile information.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function (err, response, profile) {
                if (profile.error) {
                    reject({ response });
                }
                resolve({ window: window, interval: interval, profile: profile });

            });
        })
    });
}



// Sign in with Google
export function googleLogin(google) {
    return oauth2(google)
        .then(openPopup)
        .then(pollPopup)
        .then(exchangeCodeForToken)
        // .then(signIn)
        // .then(closePopup);
}

function exchangeCodeForToken({ oauthData, config, window, interval, dispatch }) {
    return new Promise((resolve, reject) => {
        const data = Object.assign({}, oauthData, config);

        var accessTokenUrl = 'https://www.googleapis.com/oauth2/v3/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

        var params = {
            code: data.code,
            client_id: data.clientId,
            client_secret: data.clientSecret,
            redirect_uri: data.redirectUri,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        request.post({ url: accessTokenUrl, form: params, json: true }, function (err, response, token) {
            if (!token) {
                reject({ response });
            }

            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };

            // Step 2. Retrieve user's profile information.
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function (err, response, profile) {
                if (profile.error) {
                    reject({ response });
                }

                resolve({ window: window, interval: interval, profile: profile });
            });
        });
    });
}

function signIn({ token, user, window, interval, profile }) {
    return new Promise((resolve, reject) => {
        resolve({ window: window, interval: interval, profile });
    });

}


function closePopup({ window, interval, profile }) {
    return new Promise((resolve, reject) => {
        clearInterval(interval);
        window.close();
        resolve({ profile: profile });
    });
}


export function azureLogin(azure) {
    return oauth2(azure)
        .then(openPopup)
        .then(pollPopup)
        .then(exchangeAzureCodeForToken)
        .then(closePopup);
        // .then(signIn)
        // 
}

function exchangeAzureCodeForToken({ oauthData, config, window, interval, dispatch }) {
    return new Promise((resolve, reject) => {
        console.log("66666");
        const data = Object.assign({}, oauthData, config);

        var accessTokenUrl = 'https://login.microsoftonline.com/7e59cca2-3b49-4008-8ec5-c6558225d6cf/oauth2/token';
        //var accessTokenUrl = 'https://login.microsoftonline.com/d20a93a7-2e43-4f9a-83fa-f6269fae4045/oauth2/token';
        var accessTokenUrl = '/oauth2/token';
        var peopleApiUrl = 'https://graph.windows.net/d20a93a7-2e43-4f9a-83fa-f6269fae4045';
        var apiUrl = "/api/GetTableSchema"
        var peopleApiUrl = 
        console.log(oauthData,config);
        var params = {
            code: data.code,
            client_id: data.clientId,
            client_secret: data.clientSecret,
            redirect_uri: data.redirectUri,
            grant_type: 'authorization_code',
            scope :"user.read%20Fmail.read"
            //scope:data.scope
        };
        //window.close();
        //resolve({ window: window, interval: interval, profile:"44444" });
       // console.log(params);
        //axios.post(accessTokenUrl, qs.stringify(params)).then((res)=>{
            //console.log(res);
            //let accessToken = res.data.id_token;
            //var headers = { Authorization: 'Bearer ' + accessToken };
            // let userdata = {
            //     serverName : "data-analysis-db-server.database.windows.net",
            //     databaseName : "data_view_report",
            //     tableName : "test_tb1"
            //   }

            // axios.post(apiUrl, JSON.stringify(userdata),
            //     {
            //     headers:
            //     {
            //         "Authorization":"Bearer " + accessToken,
            //         'Content-Type': 'application/json'
            //     }
            // }).then((res)=>{
            //     console.log(res);
            // })
            //     axios.get(api, 
            //         {
            //             headers:
            //             {
            //                 "Authorization":"Bearer " + token
            //             },
            //             params:params
            // }
            // ).then((res)=>{
            //         resolve(res.data);
            //     }).catch((error) => {
            //         reject(error);
            //     })
            // })

     //   })
        // Step 1. Exchange authorization code for access token.
        // request.post({ url: accessTokenUrl, form: params, json: true }, function (err, response, token) {
        //     if (!token) {
        //         reject({ response });
        //     }

        //     //var accessToken = token.access_token;
        //     console.log(token);
        //     console.log(token.accessToken);
        //     // var headers = { Authorization: 'Bearer ' + accessToken };

        //     // // Step 2. Retrieve user's profile information.
        //     // request.get({ url: peopleApiUrl, headers: headers, json: true }, function (err, response, profile) {
        //     //     if (profile.error) {
        //     //         reject({ response });
        //     //     }

        //     //     
        //     // });
       // });
    });
}
