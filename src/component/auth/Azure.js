import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import keys from 'object-keys';
import { azureLogin } from '../utils/oauth';
import MicrosoftLogin from "react-microsoft-login";

let Azure = createReactClass({
    getDefaultProps: function () {
        // return {
        //     url: 'http://localhost:3000/',
        //     clientId: '',
        //     clientSecret: '',
        //     redirectUri: 'http://localhost:3000/',
        //     //authorizationUrl: 'https://login.microsoftonline.com/7e59cca2-3b49-4008-8ec5-c6558225d6cf/oauth2/authorize',
        //     authorizationUrl: 'https://login.microsoftonline.com/d20a93a7-2e43-4f9a-83fa-f6269fae4045/oauth2/authorize',
        //     scope: [''],
        //     width: 580,
        //     height: 400
        // };
        return {
            url: 'http://localhost:3000/',
            //url :"https://functionappauthtest-yizhou-1.azurewebsites.net/.auth/login/aad/callback",
            //url:"https://functionappauthtest-yizhou-1.azurewebsites.net/api/ADFuncClient",
            clientId: '',
            clientSecret: '',
            redirectUri: 'http://localhost:3000/',
            //redirectUri:"https://functionappauthtest-yizhou-1.azurewebsites.net/.auth/login/aad/callback",
            //redirectUri:"https://functionappauthtest-yizhou-1.azurewebsites.net/api/ADFuncClient",
            //authorizationUrl: 'https://login.microsoftonline.com/7e59cca2-3b49-4008-8ec5-c6558225d6cf/oauth2/authorize',
            authorizationUrl: 'https://login.microsoftonline.com/d20a93a7-2e43-4f9a-83fa-f6269fae4045/oauth2/authorize',
            scope: [''],
            width: 580,
            height: 400
        };
    },

    getAttributesForButton: function () {
        return keys(this.props).reduce((acc, prop) => {
            if (['style', 'className', 'disabled'].some(wantedProp => wantedProp === prop)) {
                acc[prop] = this.props[prop];
            }
            return acc;
        }, {});
    },

    handleClick: function () {
        azureLogin(this.props).then(res => {
            this.props.callback(null, res);
        }, error => {
            this.props.callback(error, null);
        });
    },

    render: function () {
        const buttonAttrs = this.getAttributesForButton();
        //return <button {...buttonAttrs}  >{this.props.children} </button>
        return <div onClick={this.handleClick}> <MicrosoftLogin  /></div>
    }
})

Azure.propTypes = {
    url: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    clientSecret: PropTypes.string.isRequired,
    scope: PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired
};

export default Azure;