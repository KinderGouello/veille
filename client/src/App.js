import React from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import Digest from './components/digest.component';
import { RssList } from './components/rss.component';
import digestSaga from './sagas/digest.saga';
import digestReducer from './reducers/digest.reducer';
import CustomLayout from './CustomLayout';

const customRoutes = [
  <Route exact path="/digest" component={Digest} noLayout />,
];
const dataProvider = jsonServerProvider(process.env.REACT_APP_API_URL);
const App = () => (
  <Admin
    appLayout={CustomLayout}
    customSagas={[digestSaga]}
    customReducers={{ digest: digestReducer }}
    customRoutes={customRoutes}
    dataProvider={dataProvider}
  >
    <Resource name="rss" options={{ label: 'Flux Rss' }} list={RssList} />
  </Admin>
);


export default App;