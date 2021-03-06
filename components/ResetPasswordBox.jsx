import React from 'react';
/*global ReactMeteorData */
import ErrorMessages from './ErrorMessages.jsx';
import utils from '../utils';
import LoggedIn from './LoggedIn.jsx';
import i18n from 'meteor/universe:i18n';
import { Meteor } from 'meteor/meteor';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { loadingComponent, divExterna, marginStyle,
    background,    buttonMarginStyle, cardActionsStyle, divInterna, marginButtonCard } from './Styles';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import { AccountsUiConfig } from '../AccountsUiConfig';


//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'ResetPasswordBox',

    mixins: [ReactMeteorData],

    propTypes: {
        registerLink: React.PropTypes.string
    },

    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },

    getInitialState () {
        return {
            loading: false,
            error: null,
            emailSent: false
        };
    },

    handleSubmit (e) {
        e.preventDefault();

        let email = this.refs.email.getValue();

        if (!email) {
            this.setState({ error: i18n.__('accounts-ui', 'you_need_to_provide_email') });
            return;
        }

        this.setState({
            loading: true,
            error: null
        });

        Accounts.forgotPassword({ email }, err => {
            if (err) {
                this.setState({
                    error: utils.translateError(err),
                    loading: false
                });
                return;
            }

            this.setState({
                error: null,
                loading: false,
                emailSent: true
            });
        });
    },

    renderErrorMessages() {
        if (typeof(this.state.error) === 'string') {
            let errors = [];
            errors.push(this.state.error);
            return <ErrorMessages errors={ errors }/>
        }
    },

    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        if (this.state.emailSent) {
            return (
                <div style={marginStyle}>
                    <h3><T>email_sent</T></h3>
                    <div>
                        <T>check_your_inbox_for_further_instructions</T>
                    </div>
                    {AccountsUiConfig.onResetPasswordEmailSent &&
                    <div>
                        <br/>
                        <RaisedButton
                            style={buttonMarginStyle}
                            label={<T>ok</T>}
                            onClick={AccountsUiConfig.onResetPasswordEmailSent}
                            disabled={this.state.loading}
                        />
                    </div>
                    }
                </div>
            );
        }

        return (
            <div style={background}>
                <div style={divExterna}>
                    <div style={divInterna}>
                        <Card style={marginButtonCard}>
                            <CardTitle title={<T>reset_password</T>} subtitle={<T>reset_message</T>}/>

                            <CardText>
                                <form onSubmit={this.handleSubmit}
                                      className={(this.state.loading && 'loading')}
                                      ref="form">

                                    <div className="required field">
                                        <TextField
                                            floatingLabelText={<T>your_email</T>}
                                            ref="email"
                                            type="email"
                                            fullWidth={true}
                                            disabled={this.state.loading}
                                        />
                                    </div>

                                    <CardActions style={cardActionsStyle}>
                                        {loadingComponent(this.state.loading)}
                                        <RaisedButton
                                            style={{
									        float: "right", position: "relative",
									        marginBottom: 10, marginTop: 10, marginRight: 15
								        }}
                                            type="submit"
                                            primary={true}
                                            label={<T>send_reset_link</T>}
                                            disabled={this.state.loading}
                                        />

                                        <RaisedButton
                                            style={{
									        float: "right", position: "relative",
									        marginBottom: 10, marginTop: 10, marginRight: 15
								        }}
                                            label={<T>cancel</T>}
                                            onClick={() => { window.history.back() }}
                                            disabled={this.state.loading}
                                        />
                                    </CardActions>
                                </form>

                            </CardText>
                            {this.props.registerLink ?
                                <div className="ui large bottom attached info icon message">
                                    <T>dont_have_an_account</T>
                                    <a href={this.props.registerLink}>&nbsp;<T>register_here</T></a>
                                </div>
                                : ''}

                        </Card>
                    </div>
                </div>
            </div>
        );
    }
});
