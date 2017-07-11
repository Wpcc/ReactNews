import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

import PCHeader from './components/pc_header.js';
import PCFooter from './components/pc_footer.js';
import PCNewsContainer from './components/pc_news_container';
import PCNewsDetails from './components/pc_news_details.js';
import PCUsercenter from './components/pc_usercenter.js'

import MobileHeader from './components/mobile_header.js';
import MobileTabs from './components/mobile_tabs.js';
import MobileFooter from './components/mobile_footer.js';
import MobileNewsDetails from './components/mobile_news_details.js';
import MobileUsercenter from './components/mobile_usercenter.js';

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
							<Route path="/usercenter" component={PCUsercenter}/>
							<PCFooter/>
						</div>
					</HashRouter>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<HashRouter>
						<div>
							<MobileHeader/>
							<Route exact path="/" component={MobileTabs}/>
							<Route path="/detail/:uniquekey" component={MobileNewsDetails}/>
							<Route path="/usercenter" component={MobileUsercenter}/>
							<MobileFooter/>
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