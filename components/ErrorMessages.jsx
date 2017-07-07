import React from 'react';

export default React.createClass({
    displayName: 'ErrorMessages',

    propTypes: {
        errors: React.PropTypes.array.isRequired
    },

    render() {
        return (
            <div style={{ marginLeft: 15, fontWeight: '100', color: 'red'}}>
                { this.props.errors.map((error, index) => {
                    return <li style={{listStyleType: 'none'}}
                               key={ index }>
                        { error }
                    </li>;
                }) }
            </div>
        );
    }
});
