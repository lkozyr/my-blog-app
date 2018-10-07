import React, { Component } from 'react';
import './app.css';

import CCHeader from '../containers/CCHeader';

class App extends Component {

	render() {
		return (
		<div className="app">
			<CCHeader />
			<section className="main">
			</section>

		</div>
		);
	}
}

export default App;

