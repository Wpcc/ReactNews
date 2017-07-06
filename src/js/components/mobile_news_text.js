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

export default class MobileNewsText extends React.Component{
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
			display:'flex',	
			justifyContent:'space-around',
			width:"100%",
			overflow:'hidden',
			paddingBottom:10,
			paddingTop:10,
			borderBottom:'1px solid #ddd',
			
		}
		var imageStyle={
			width:93,
			height:70,
		}
		var listLeft={
			width:93,
			height:70,
			float:'left',
		}
		var listRight={
			width:240,
			height:70,
			float:'left',
			textOverflow: 'ellipsis',
			overflow:'hidden',
			position:'relative',
			color:'#888'
		}
		var timeStyle={
			position:'absolute',
			right:0,
			bottom:0
		}

		const news=this.state.news;
		// console.log("one:"+news);
		// console.log("two:"+news.length)
		const newsList=news.length
		?
		news.map((item,index)=>{
			return(	
				<Link key={index} to={`detail/${item.uniquekey}`} style={{color:'#666'}}>
					<li style={newsStyle}>				
						<div style={listLeft}>
							<img src={item.thumbnail_pic_s} alt="" style={imageStyle} />
						</div>
						<div style={listRight}>
							<span style={{color:'#404040',fontSize:14}}>{item.title}</span>
							<span style={timeStyle}>{item.date}</span>
						</div>
					</li>
				</Link>
			)
		})
		:
		'没有加载到任何新闻';
		//console.log(newsList);

		return(
			<div className="newsText">
				<ul>
					{newsList}
				</ul>
			</div>
		)
	}
}