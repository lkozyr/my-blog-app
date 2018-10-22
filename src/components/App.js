import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './app.css';

import CCHeader from '../containers/CCHeader';
import CCArticleList from '../containers/CCArticleList';
import CCNewArticle from '../containers/CCNewArticle';
import CCArticleDetails from '../containers/CCArticleDetails';
import Footer from './Footer';

class App extends Component {

	render() {
		return (
		<div className="app">

			<CCHeader />

			<section className="main">
				<Switch>
					<Route 
						exact path="/" 
						component={CCArticleList} />
				
					<Route
						path="/new"
						component={CCNewArticle} />

					<Route
						path="/read"
						component={CCArticleDetails} />

					<Route
						path="/edit"
						component={CCArticleDetails} />

				</Switch>
			</section>

			<Footer />
			
		</div>
		);
	}
}

export default App;

