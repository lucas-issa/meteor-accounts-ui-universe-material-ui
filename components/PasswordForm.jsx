import React from 'react';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { AccountsUiConfig } from '../AccountsUiConfig';
import { loadingComponent, divExterna, cardActionsStyle, divInterna, marginButtonCard, paddingLeftandRightCard } from './Styles';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import ErrorMessages from './ErrorMessages.jsx';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'PasswordForm',

    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        type: React.PropTypes.oneOf(['login', 'register']).isRequired,
    },

    getInitialState () {
        return {
            loading: false,
            errors: []
        };
    },

    renderErrorMessages() {
        if (this.state.errors.length) {
            return <ErrorMessages errors={ this.state.errors }/>
        }
    },

    componentWillUnmount() {
        this.unmounted = true;
    },

    handleSubmit (e) {
        e.preventDefault();

        const { clearErrors } = this.props;
        const onError = utils.onError.bind(this);

        var passwordNode = this.refs.password;
        var emailNode = this.refs.email;

        if (this.props.type === 'login') {
            // log in / sign in

            this.setState({ loading: true });
            Meteor.loginWithPassword(
                emailNode.getValue(),
                passwordNode.getValue(),
                (err) => {
                    if (!this.unmounted) {
                        // let errors = this.state.errors;
                        this.setState({ loading: false });
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

            this.setState({ loading: true });

            Accounts.createUser({
                email: emailNode.getValue(),
                password: passwordNode.getValue()
            }, (err) => {
                this.setState({ loading: false });
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
            <div style={divExterna}>
                <div style={divInterna}>
                    <Card style={marginButtonCard}>
                        <CardTitle title="Login" subtitle={<T>login_message</T>}/>

                        <form onSubmit={this.handleSubmit} className={(this.state.loading && 'loading')} ref="form">
                            <div style={paddingLeftandRightCard}>
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

                                {isRegistration && <div className="required field">
                                    <TextField
                                        floatingLabelText={<T>repeat_password</T>}
                                        ref="password2"
                                        type="password"
                                        fullWidth={true}
                                        disabled={this.state.loading}
                                    />
                                </div> }
                            </div>

                            { this.renderErrorMessages() }

                            <CardActions style={cardActionsStyle}>
                                {loadingComponent(this.state.loading)}
                                <RaisedButton
                                    style={{
									float: "right", position: "relative",
									marginBottom: 10, marginTop: 10, marginRight: 15
								    }}
                                    label={<T>cancel</T>}
                                    onClick={AccountsUiConfig.onCancel}
                                    disabled={this.state.loading}
                                />

                                <RaisedButton
                                    style={{
									float: "right", position: "relative",
									marginBottom: 10, marginTop: 10
								    }}
                                    type="submit"
                                    primary={true}
                                    label={ isRegistration ?
                                        i18n.__('accounts-ui', 'sign_up') :
                                        i18n.__('accounts-ui', 'sign_in')
                                    }
                                    disabled={this.state.loading}
                                />
                            </CardActions>
                        </form>

                        {(this.props.registerLink || this.props.resetLink) ?
                            <div style={{margin: 5, paddingBottom: 5}}>
                                <div>
                                    {this.props.registerLink ?
                                        <div>
                                            <T>dont_have_an_account</T>
                                            <br/>
                                            <a href={this.props.registerLink}><T>register_here</T></a>
                                        </div>
                                        : ''}
                                    {this.props.resetLink ?
                                        <div>
                                            <a href={this.props.resetLink}><T>forgot_your_password</T></a>
                                        </div>
                                        : ''}
                                </div>
                            </div>
                            : ''}
                    </Card>
                </div>
            </div>
        );
    }
});