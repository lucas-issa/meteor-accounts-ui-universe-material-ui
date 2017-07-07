import React from 'react';
import i18n from 'meteor/universe:i18n';
import RaisedButton from 'material-ui/RaisedButton';
import { buttonMarginStyle, divExterna, divInterna, marginButtonCard, background } from './Styles';
import { AccountsUiConfig } from '../AccountsUiConfig';
import { Card, CardTitle } from 'material-ui/Card';
//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));

export default React.createClass({

    displayName: 'LoggedIn',

    render () {
        return (
            <div style={background}>
                <div style={{height: "100vh"}}>
                    <div style={divExterna}>
                        <div style={divInterna}>
                            <Card style={marginButtonCard}>
                                <CardTitle title={<T>youre_logged_in</T>}/>

                                <div style={{marginLeft: 65, paddingBottom: 15}}>

                                    <RaisedButton
                                        style={buttonMarginStyle}
                                        onClick={AccountsUiConfig.onGoToLoggedInHome}
                                        primary={true}
                                        label={<T>back</T>}
                                    />

                                    <RaisedButton
                                        style={buttonMarginStyle}
                                        onClick={() => Meteor.logout()}
                                        label={<T>click_to_log_out</T>}
                                    />

                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});