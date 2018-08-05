import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';

const DigestMenu = ({ resources, onMenuClick, logout }) => (
  <div>
    <MenuItemLink to="/digest" primaryText="Nouveau digest !" onClick={onMenuClick} />
    {resources.map(resource => (
      <MenuItemLink to={`/${resource.name}`} primaryText={resource.name} onClick={onMenuClick} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(DigestMenu));