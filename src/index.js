import React from 'react';
import { render } from 'react-dom';
import Root from '@ups/components/root';
import { getRootElement } from '@ups/utils/dom';
import { Provider } from 'react-redux';
import store from './store/store';
import '@ups/index.scss';

render(
	<Provider store={store}>
		<Root />
	</Provider>,
	getRootElement()
);

if (module.hot) {
	module.hot.accept();
}
