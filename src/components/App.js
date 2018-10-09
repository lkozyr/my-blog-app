import React, { Component } from 'react';
import './app.css';

import CCHeader from '../containers/CCHeader';
import CCArticleList from '../containers/CCArticleList';

class App extends Component {

	render() {
		return (
		<div className="app">
			<CCHeader />
			<section className="main">
				<CCArticleList />
			</section>

		</div>
		);
	}
}

export default App;

