import React from 'react';

import { 
	Card
} from 'antd';

// 路由
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class PCNewsImage extends React.Component{
	constructor(){
		super();
		this.state={
			news:''
		}
	}

	componentWillMount(){
		var FetchOptions = {
			method:"GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+
			this.props.count,FetchOptions)
		.then(response=>response.json())
		.then(json=>this.setState({
			news:json
		}));

	}
	
	render(){
		const news=this.state.news;
		const newsList=news.length
		?
		news.map((item,index)=>{
			return(	
				<li key={index} className="liStyle">
					<Link to={`detail/${item.uniquekey}`} target='_blank' style={{color:'#666'}}>
						<div>
							<img src={item.thumbnail_pic_s} alt='图片' className="imageStyle" />
						</div>
						<h3 className="titleStyle">
							{item.title}
						</h3>
						<p style={{color:'#999'}} className="titleStyle">
							{item.author_name}
						</p>
					</Link>
				</li>
			)
		})
		:
		'没有加载到任何新闻';
		//console.log(newsList);

		return(
			<div className="newsImage">
				<Card title={this.props.imageTitle} >
					<ul className="clearfix">
						{newsList}
					</ul>
				</Card>
			</div>
		)
	}
}