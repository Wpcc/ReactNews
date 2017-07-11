import React from 'react';
import {HashRouter, Link, Route} from 'react-router-dom';

import { 
	Row, 
	Col,
	Modal,
	Menu,
	Icon,
	message,
	Button,
	CheckBox,
	Input,
	Tabs,
	Card,
	notification
} from 'antd';

const TabPane = Tabs.TabPane;

export default class MobileUserCerter extends React.Component{
	constructor(){
		super();
		this.state={
			userCollection:'',
			userComments:''
		}
	}
	componentDidMount() {
		var FetchOptions = {
			method: 'GET'
		};

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" 
			+ localStorage.userId, FetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({userCollection:json});
			console.log(this.state.userCollection)
		});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="
			+ localStorage.userId, FetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({userComments:json});
		});
	};

	render(){
		const {userCollection,userComments} = this.state;

		const userCollectionList = userCollection.length
		?
		userCollection.map((item,index)=>{
			return (
				<Card 
				key={index} 
				title={item.uniquekey} 
				extra={<a target='_blank' href={`/detail/${item.uniquekey}`}>查看</a>} 
				style={{marginBottom:10}}
				>
					<p>{item.Title}</p>
				</Card>
			)
		})
		:
		'您还没有收藏任何的新闻，快去收藏一些新闻吧。';

		const userCommentsList = userComments.length ?
		userComments.map((item,index)=>(
			<Card 
			key={index} 
			title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`} 
			extra={<a target="_blank" href={`/#/details/${item.uniquekey}`}>查看</a>} 
			style={{marginBottom:10}}
			>
				<p>{item.Comments}</p>
			</Card>		
		))
		:
		'您还没有发表过任何评论。';

		return(
			<Tabs>
				<TabPane tab="我的收藏列表" key="1">
					<Row>
						<Col span={1}></Col>
						<Col span={22}>
							{userCollectionList}
						</Col>
						<Col span={1}></Col>
					</Row>
				</TabPane>
				<TabPane tab="我的评论列表" key="2">
					<Row>
						<Col span={1}></Col>
						<Col span={22}>
							{userCommentsList}
						</Col>
						<Col span={1}></Col>
					</Row>
				</TabPane>
			</Tabs>
		)
	}
}