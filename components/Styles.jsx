import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export const marginStyle = {
    margin: 40,
};

export const buttonMarginStyle = {
    marginRight: 20,
};

export const loadingComponent = (loading) => (
    loading && <CircularProgress size={22} style={{top: 5}} />
);