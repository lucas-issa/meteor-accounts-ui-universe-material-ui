import React from 'react';
import utils from '../utils';
import OAuthButton from './OAuthButton.jsx';
import PasswordForm from './PasswordForm.jsx';
import i18n from 'meteor/universe:i18n';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoginForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        registerLink: React.PropTypes.string,
        resetLink: React.PropTypes.string
    },
    render () {
        let services = utils.getServiceNames();
        const { clearErrors, registerLink, resetLink  } = this.props;

        //`Sign in with ${utils.capitalize(service)}`
        return (
            <div style={{height: "100vh"}}>
                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`${i18n.__('accounts-ui', 'sign_in_with')} ${utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && utils.hasPasswordService() ?
                    <div className="ui horizontal divider"><T>sign_in_with_email</T></div> : ''
                }

                {utils.hasPasswordService() ?
                    <PasswordForm
                        type="login"
                        clearErrors={ clearErrors }
                        registerLink={registerLink}
                        resetLink={resetLink}
                      /> : ''
                }

            </div>
        );
    }
});