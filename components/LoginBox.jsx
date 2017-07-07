import React from 'react';
/*global ReactMeteorData */
import LoginForm from './LoginForm.jsx';
import LoggedIn from './LoggedIn.jsx';
import utils from '../utils';
import i18n from 'meteor/universe:i18n';
import {marginStyle, background} from './Styles';

//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoginBox',

    propTypes: {
        registerLink: React.PropTypes.string,
        resetLink: React.PropTypes.string
    },

    mixins: [ReactMeteorData],

    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },

    render () {

        if (this.data.user) {
            return <LoggedIn />;
        }

        return (
            <div style={background} className="background">
                <LoginForm
                    clearErrors={ utils.clearErrors.bind(this) }
                    registerLink={this.props.registerLink}
                    resetLink={this.props.resetLink}
                />
            </div>
        );
    }
});