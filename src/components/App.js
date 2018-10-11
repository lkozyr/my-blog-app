import React, { Component } from 'react';
import './app.css';

import CCHeader from '../containers/CCHeader';
import CCArticleList from '../containers/CCArticleList';
import Footer from './Footer';

class App extends Component {

	render() {
		return (
		<div className="app">
			<CCHeader />
			<section className="main">
				<CCArticleList />
			</section>
			<Footer />
		</div>
		);
	}
}

export default App;

