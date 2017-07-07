import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { AccountsUiConfig } from '../AccountsUiConfig';

export const marginStyle = {
    margin: 40,
};

export const buttonMarginStyle = {
    marginRight: 20,
};

export const divExterna = {
    height: '10em',
    position: 'relative',
    top: 200,
};

export const divInterna = {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
};

export const marginButtonCard = {
    marginBottom: 20,
    width: 380
};

export const paddingLeftandRightCard = {
    paddingLeft: 15,
    paddingRight: 15
};

export const cardActionsStyle = {
    display: 'inline-block',
    width: '100%',
    padding: 0
};


export const background = {
    get backgroundImage() {
        return `url(${AccountsUiConfig.backgroundImageUrl})`;
    },
    width: "100%",
    height: "100%",
    backgroundSize: "cover"
};

export const loadingComponent = (loading) => (
    loading && <CircularProgress size={22} style={{top: 5}}/>
);