import React from 'react';

export default React.createClass({  displayName: 'ErrorMessages',
  propTypes: {
    errors: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <div style={{
          margin: 40,
          fontWeight: 'bold',
          color: 'red',
      }}>
        <i />
        <div>
          <ui>
            { this.props.errors.map((error, index) => {
              return <li style={{listStyleType: 'none'}} key={ index }>{ error }</li>;
            }) }
          </ui>
        </div>
      </div>
    );
  }
});
