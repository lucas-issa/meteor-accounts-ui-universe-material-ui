import React from 'react';
import i18n from 'meteor/universe:i18n';
import RaisedButton from 'material-ui/RaisedButton';
import {marginStyle, buttonMarginStyle} from './Styles';
import {AccountsUiConfig} from '../AccountsUiConfig';
//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoggedIn',
    render () {
        return (
            <div style={marginStyle}>

                <h2><T>youre_logged_in</T></h2>

                <RaisedButton
                    style={buttonMarginStyle}
                    onClick={AccountsUiConfig.onLogin}
                    primary={true}
                    label={<T>back</T>}
                />

                <RaisedButton
                    style={buttonMarginStyle}
                    onClick={() => Meteor.logout()}
                    label={<T>click_to_log_out</T>}
                />

            </div>
        );
    }
});