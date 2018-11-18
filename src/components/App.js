import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './css/app.css';

import CCHeader from '../containers/CCHeader';
import CCConnectionState from '../containers/CCConnectionState';
import CCArticleList from '../containers/CCArticleList';
import CCNewArticle from '../containers/CCNewArticle';
import CCArticleDetails from '../containers/CCArticleDetails';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

class App extends Component {

	render() {
		return (
		<div className="app">

			<div className="content-wrapper">
				<CCHeader />
				<CCConnectionState />
				
				<section className="main">
					<Switch>
						<Route 
							exact path="/" 
							component={CCArticleList} />

						<Route 
							path="/search" 
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

						<Route
							path="/about"
							component={About} />

						<Route
							path="/contact"
							component={Contact} />

					</Switch>
				</section>
			</div>

			<Footer />
			
		</div>
		);
	}
}

export default App;

