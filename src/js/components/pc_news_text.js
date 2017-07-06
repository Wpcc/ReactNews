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

export default class PCNewsText extends React.Component{
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

		// 样式
		var newsStyle={
			fontSize:14,
			lineHeight:2,		
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			overflow:'hidden',
			width:350
		}

		const news=this.state.news;
		// console.log("one:"+news);
		// console.log("two:"+news.length)
		const newsList=news.length
		?
		news.map((item,index)=>{
			return(	
				<li key={index} style={newsStyle}>
					<Link to={`detail/${item.uniquekey}`} target='_blank' style={{color:'#666'}}>
						{item.title}
					</Link>
				</li>
			)
		})
		:
		'没有加载到任何新闻';
		//console.log(newsList);

		return(
			<div className="newsText">
				<Card>
					<ul>
						{newsList}
					</ul>
				</Card>
			</div>
		)
	}
}