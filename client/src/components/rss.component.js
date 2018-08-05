import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const RssList = (props) => (
  <List {...props} title="Liste des flux">
    <Datagrid>
      <TextField source="name" />
      <TextField source="url" />
    </Datagrid>
  </List>
);
