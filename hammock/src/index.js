'use strict'

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import Navigators from './navigation/navigators';
import reducers from './reducers';

class index extends React.Component {

  store = configureStore(reducers)

  render() {
    return (
      <Provider store={this.store}>
          <Navigators />
      </Provider>
    );
  }
}

export default index;

