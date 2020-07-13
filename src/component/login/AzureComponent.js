import React from 'react';
import createReactClass from 'create-react-class';
import Azure  from '../auth/Azure';
// import cookie from 'react-cookies'

let AzureComponent = createReactClass({
  getInitialState: function () {
    return {
      "data": {
        "id": "", "name": "", "email": "", "gender": "", "location": { "id": "", "name": "" }
      }
    };
  },

  azure: function (err, res) {
    // if (!err) {
    //   this.setState({ data: res.profile })
    // } else {
    //   this.setState({ data: 'something happen wrong' })
    // }'
    // setTimeout(()=>{open(location, '_self').close();}, 700)
    window.location.href="about:blank";
    window.close();
  },

  render: function () {
    return <div>
      <Azure
        url={'http://localhost:3000'}
        //url = {"https://functionappauthtest-yizhou-1.azurewebsites.net/.auth/login/aad/callback"}
        //url={"https://functionappauthtest-yizhou-1.azurewebsites.net/api/ADFuncClient"}
        //clientId={'298a5a83-79b5-4904-aa92-fcb9ebd26273'}
        clientId={'633fccb6-7fcd-42d5-9d6c-2797f18e57a8'}
        clientSecret={'tlNM0ywN6oWz4VQnL9jUmUDOG8TWHvwv/BKGJHoGaqY='}
        //redirectUri={'http://localhost:3000'}
        //redirectUri = {"https://functionappauthtest-yizhou-1.azurewebsites.net/.auth/login/aad/callback"}
        redirectUri={"https://functionappauthtest-yizhou-1.azurewebsites.net/api/ADFuncClient"}
        scope={['openid']}
        response_type={'id_token+code'}
        width={300}
        height={300}
        callback={this.azure}
        style={{ color: 'green' }}
      >
        Login With Google From component
  </Azure>
      <hr />
    </div>
  }
});

export default AzureComponent;