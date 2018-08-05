import React from 'react';
import { Layout } from 'react-admin';
import DigestMenu from './DigestMenu';

const CustomLayout = (props) => <Layout {...props} menu={DigestMenu} />;

export default CustomLayout;