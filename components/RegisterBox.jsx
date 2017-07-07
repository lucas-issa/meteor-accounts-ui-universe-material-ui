import React from 'react';
/*global ReactMeteorData */
import ErrorMessages from './ErrorMessages.jsx';
import RegisterForm from './RegisterForm.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';
import { divExterna, divInterna, marginButtonCard } from './Styles';
import { Card, CardTitle } from 'material-ui/Card';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'RegisterBox',

    propTypes: {
        loginLink: React.PropTypes.string
    },

    mixins: [ReactMeteorData],

    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },

    getInitialState () {
        return {
            errors: []
        };
    },

    renderErrorMessages() {
        if (this.state.errors.length) {
            return <ErrorMessages errors={ this.state.errors }/>
        }
    },

    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        const { clearErrors, onError } = this.props;

        return (
            <div style={divExterna}>
                <div style={divInterna}>
                    <Card style={marginButtonCard}>
                        <CardTitle title={<T>sign_up</T>} subtitle={<T>login_message</T>}/>

                        <RegisterForm
                            onError={ utils.onError.bind(this) }
                            clearErrors={ utils.clearErrors.bind(this) }
                        />

                        {this.props.loginLink ?
                            <div className="ui large bottom attached info icon message">
                                <T>already_have_an_account</T>
                                <a href={this.props.loginLink}>&nbsp;<T>click_to_login</T></a>
                            </div>
                            : ''}

                        { this.renderErrorMessages() }
                    </Card>
                </div>
            </div>

        );
    }
});