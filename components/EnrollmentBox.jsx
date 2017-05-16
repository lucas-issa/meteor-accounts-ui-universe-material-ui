import React from 'react';
import ErrorMessages from './ErrorMessages.jsx';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';
import {Accounts} from 'meteor/accounts-base';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {marginStyle, buttonMarginStyle, loadingComponent} from './Styles';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'EnrollmentBox',
    propTypes: {
        token: React.PropTypes.string,
        onComplete: React.PropTypes.func
    },
    getInitialState() {
        return {
            loading: false,
            error: null,
            emailSent: false
        };
    },
    handleSubmit(e) {
        e.preventDefault();

        let password = this.refs.password.getValue();

        if (!password) {
            this.setState({error: i18n.__('accounts-ui', 'you_need_to_provide_password')});
            return;
        }

        this.setState({
            loading: true,
            error: null
        });

        Accounts.resetPassword(this.props.token, password, err => {
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

            if (this.props.onComplete) {
                this.props.onComplete();
            }
        });
    },
    renderErrorMessages() {
        if (typeof(this.state.error) ===  'string') {
            let errors = [];
            errors.push(this.state.error);
            return <ErrorMessages errors={ errors } />
        }
    },
    render () {
        if (this.state.emailSent) {
            return (
                <div>
                    <h3 ><T>email_sent</T></h3>
                    <T>check_your_inbox_for_further_instructions</T>
                </div>
            );
        }

        return (
            <div>
                <div style={marginStyle}>

                    <h3><T>reset_password</T></h3>

                    <form onSubmit={this.handleSubmit}
                          className={(this.state.loading && 'loading')}
                          ref="form">

                        <div className="required field">
                            <TextField
                                floatingLabelText={<T>your_new_password</T>}
                                ref="password"
                                type="password"
                                fullWidth={true}
                                disabled={this.state.loading}
                            />
                        </div>

                        <RaisedButton
                            style={buttonMarginStyle}
                            type="submit"
                            primary={true}
                            label={<T>save</T>}
                            disabled={this.state.loading}
                        />
                        {loadingComponent(this.state.loading)}
                    </form>
                </div>

                { this.renderErrorMessages() }
            </div>
        );
    }
});
