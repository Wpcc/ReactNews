import React from 'react';

import { 
	Row,
	Col,
	BackTop
} from 'antd';

import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';

export default class MobileNewsDetails extends React.Component{
	constructor(...args){
		super(...args);
		this.state={
			newsDetails:''
		}
	}

	componentDidMount(){
		var FetchOptions={
			method:'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
			+this.props.match.params.uniquekey,FetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({newsDetails:json})
			document.title=this.state.newsDetails.title+' - React News | React 驱动的新闻平台'
			}
		)
	}

	createNewsDetails(){
		return {__html: this.state.newsDetails.pagecontent}
	}
	render(){
		

		return(
			<div id="mobileDetailsContainer">
				<MobileHeader/>
				<Row>
					<Col span={24}>
						<div className="articleContainer" dangerouslySetInnerHTML={this.createNewsDetails()}></div>
					</Col>
				</Row>
				<MobileFooter/>
				<BackTop/>
			</div>
		)
	}
}