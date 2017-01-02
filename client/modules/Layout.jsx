import React from 'react';

export default function Layout(props) {
  return (
    <div className="layout-content">{props.children}</div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
};
