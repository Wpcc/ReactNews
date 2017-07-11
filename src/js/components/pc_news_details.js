import React from 'react';

import { 
	Row,
	Col,
	BackTop
} from 'antd';

import PCNewsImage from './pc_news_image';
import CommonComments from './common_comments.js';

export default class PCNewsDetails extends React.Component{
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
			document.title=this.state.newsDetails.title+' - React News | React 驱动的新闻平台';
			console.log(this.props.match.params.uniquekey)
			}
		)
	}

	createNewsDetails(){
		return {__html: this.state.newsDetails.pagecontent}
	}

	render(){
		return(
			<div className="newsDetails">
				<Row>
					<Col span={2}></Col>
					<Col span={14}>
						<div className="articleContainer" dangerouslySetInnerHTML={this.createNewsDetails()}></div>
						<CommonComments uniquekey={this.props.match.params.uniquekey} />
					</Col>
					<Col span={6}>
						<PCNewsImage count={40} type={"guoji"} imageTitle={"国际"} />
					</Col>
					<Col span={2}></Col>
				</Row>

				<BackTop/>
			</div>
		)
	}
}