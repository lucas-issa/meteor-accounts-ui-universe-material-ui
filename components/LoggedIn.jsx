import React from 'react';
import i18n from 'meteor/universe:i18n';
import RaisedButton from 'material-ui/RaisedButton';
import {marginStyle} from './Styles';
//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({
    displayName: 'LoggedIn',
    render () {
        return (
            <div style={marginStyle}>

                <h2><T>youre_logged_in</T></h2>

                <RaisedButton
                    onClick={() => Meteor.logout()}
                    primary={true}
                    label={<T>click_to_log_out</T>}
                />

            </div>
        );
    }
});