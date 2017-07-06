import React from 'react';

import { 
	Row,
	Col,
	Tabs,
	Carousel  //轮播图
} from 'antd';

import PCNewsText from './pc_news_text';
import PCNewsImage from './pc_news_image';


const TabPane=Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
	render(){
		return(
			<Row>
				<Col span={2}></Col>
				<Col span={20} className="container">
					<div className="leftContainer">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<PCNewsImage count={6} type={"guoji"} imageTitle={"国际"} />
					</div>
					
					<Tabs className="centerContainer">
						<TabPane tab="头条" key="1">
							<PCNewsText count={20} type={"top"}/>
						</TabPane>
						<TabPane tab="国际" key="2">
							<PCNewsText count={20} type={"guoji"}/>
						</TabPane>
					</Tabs>
				</Col>
				<Col span={2}></Col>
			</Row>
		)
	}
}