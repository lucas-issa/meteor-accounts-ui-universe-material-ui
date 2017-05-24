import React from 'react';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {AccountsUiConfig} from '../AccountsUiConfig';
import {buttonMarginStyle, loadingComponent} from './Styles';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'PasswordForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func.isRequired,
        type: React.PropTypes.oneOf(['login', 'register']).isRequired
    },
    getInitialState () {
        return {
            loading: false
        };
    },
    componentWillUnmount() {
        this.unmounted = true;
    },
    handleSubmit (e) {
        e.preventDefault();

        const { clearErrors, onError } = this.props;
        var passwordNode = this.refs.password;
        var emailNode = this.refs.email;

        if (this.props.type === 'login') {
            // log in / sign in

            this.setState({loading: true});
            Meteor.loginWithPassword(
                emailNode.getValue(),
                passwordNode.getValue(),
                (err) => {
                    if (!this.unmounted) {
                        // let errors = this.state.errors;
                        this.setState({loading: false});
                    }

                    if (err && err.error === 400) {
                        onError(i18n.__('accounts-ui', 'invalid_usename_or_password'));
                    } else if (err) {
                        onError(utils.translateError(err));
                    } else {
                        if (!this.unmounted) {
                            clearErrors();
                        }
                        if (AccountsUiConfig.onExplicitLogin) {
                            setTimeout(AccountsUiConfig.onExplicitLogin, 0);
                        }
                    }
                }
            );
        } else {
            // register / sign up
            var passwordNode2 = this.refs.password2;

            if (passwordNode.getValue() !== passwordNode2.getValue()) {
                onError(i18n.__('accounts-ui', 'passwords_dont_match'));

                return;
            }

            this.setState({loading: true});

            Accounts.createUser({
                email: emailNode.getValue(),
                password: passwordNode.getValue()
            }, (err) => {
                this.setState({loading: false});
                if (err) {
                    // console.log('err: ', err);
                    onError(utils.translateError(err));
                } else {
                    clearErrors();
                    // this.refs.form.reset();
                }
            });
        }
    },
    render () {
        if (!utils.hasPasswordService()) {
            return <div></div>;
        }
        let isRegistration = (this.props.type === 'register');

        return (
            <form onSubmit={this.handleSubmit}
                  className={(this.state.loading && 'loading')}
                  ref="form">

                <div className="required field">
                    <TextField
                        floatingLabelText={<T>email</T>}
                        ref="email"
                        type="email"
                        fullWidth={true}
                    />
                </div>

                <div className="required field">
                    <TextField
                        floatingLabelText={<T>password</T>}
                        ref="password"
                        type="password"
                        fullWidth={true}
                    />
                </div>

                {isRegistration &&
                <div className="required field">
                    <TextField
                        floatingLabelText={<T>repeat_password</T>}
                        ref="password2"
                        type="password"
                        fullWidth={true}
                        disabled={this.state.loading}
                    />
                </div>
                }

                <div>
                    <RaisedButton
                        style={buttonMarginStyle}
                        type="submit"
                        primary={true}
                        label={
                            isRegistration ?
                                i18n.__('accounts-ui', 'sign_up') :
                                i18n.__('accounts-ui', 'sign_in')
                        }
                        disabled={this.state.loading}
                    />
                    <RaisedButton
                        style={buttonMarginStyle}
                        label={<T>cancel</T>}
                        onClick={AccountsUiConfig.onCancel}
                        disabled={this.state.loading}
                    />
                    {loadingComponent(this.state.loading)}
                </div>
            </form>
        );
    }
});