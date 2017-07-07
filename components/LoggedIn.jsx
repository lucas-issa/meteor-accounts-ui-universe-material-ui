import React from 'react';
import i18n from 'meteor/universe:i18n';
import RaisedButton from 'material-ui/RaisedButton';
import {marginStyle, buttonMarginStyle} from './Styles';
import {AccountsUiConfig} from '../AccountsUiConfig';
//instance of translate component in "accounts-ui" namespace
const T = i18n.createComponent(i18n.createTranslator('accounts-ui'));
import { loadingComponent, divExterna, cardActionsStyle, divInterna, marginButtonCard, paddingLeftandRightCard } from './Styles';
import { Card, CardTitle, CardActions } from 'material-ui/Card';

export default React.createClass({

    displayName: 'LoggedIn',

    render () {
        return (
        <div style={divExterna}>
            <div style={divInterna}>
                <Card style={marginButtonCard}>
                    <CardTitle title={<T>youre_logged_in</T>} subtitle="Faça login para ter acesso ao sistema"/>

                    <div style={marginStyle}>

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
        );
    }
});