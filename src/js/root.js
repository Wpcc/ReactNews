import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

import PCHeader from './components/pc_header.js';
import PCFooter from './components/pc_footer.js';
import PCNewsContainer from './components/pc_news_container';
import PCNewsDetails from './components/pc_news_details.js';

import MobileIndex from './components/mobile_index.js';
import MobileNewsDetails from './components/mobile_news_details.js';

class Root extends React.Component{
	render(){
		return(
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<HashRouter>
						<div>
							<PCHeader/>
							<Route exact path="/" component={PCNewsContainer}/>
							<Route path="/detail/:uniquekey" component={PCNewsDetails}/>
							<PCFooter/>
						</div>
					</HashRouter>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<HashRouter>
						<div>
							<Route exact path="/" component={MobileIndex}/>
							<Route path="/detail/:uniquekey" component={MobileNewsDetails}/>
						</div>
					</HashRouter>
				</MediaQuery>
			</div>
		)
	}
}

ReactDOM.render(
	<Root/>,
	document.querySelector('#mainContainer')
	)