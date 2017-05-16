import React from 'react';
/*global ReactMeteorData */
import ErrorMessages from './ErrorMessages.jsx';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';
import {marginStyle} from './Styles';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'RegisterBox',
    propTypes: {
        loginLink: React.PropTypes.string
    },
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },
    getInitialState() {
        return {
            errors: []
        };
    },
    renderErrorMessages() {
        if (this.state.errors.length) {
            return <ErrorMessages errors={ this.state.errors } />
        }
    },
    render() {
        if (this.data.user) {
            return <LoggedIn />;
        }

        return (
            <div>
                <div>
                    <div>
                        <div style={marginStyle}>
                            <h3 ><T>sign_in</T></h3>

                            <LoginForm
                              onError={ utils.onError.bind(this) }
                              clearErrors={ utils.clearErrors.bind(this) }
                              />
                        </div>
                        <div style={marginStyle}>
                            <T>or</T>
                        </div>
                        <div style={marginStyle}>
                            <h3><T>sign_up</T></h3>

                            <RegisterForm
                                onError={ utils.onError.bind(this) }
                                clearErrors={ utils.clearErrors.bind(this) }
                                />
                        </div>
                    </div>
                </div>

                {this.props.resetLink &&
                    <div>
                        <i className="user icon"></i>
                        <T>forgot_your_password</T><a href={this.props.resetLink}>&nbsp;<T>click_to_reset</T></a>
                    </div>
                }

                { this.renderErrorMessages() }
            </div>
        );
    }
});