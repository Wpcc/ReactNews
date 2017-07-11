import React from 'react';

import { 
	Row,
	Col,
	Tabs,
	Carousel  //轮播图
} from 'antd';

import PCNewsText from './pc_news_text';
import PCNewsImage from './pc_news_image';
import PCNewsRef from './pc_news_ref';


const TabPane=Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
	render(){
		return(
			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="father-container">
						<div className="container">
							<div className="leftContainer">
								<Carousel autoplay className="carousel">
								    <div><img src="../src/img/carousel_1.jpg"/></div>
									<div><img src="../src/img/carousel_2.jpg"/></div>
									<div><img src="../src/img/carousel_3.jpg"/></div>
									<div><img src="../src/img/carousel_4.jpg"/></div>
								</Carousel>
								<PCNewsImage count={6} type={"guoji"} imageTitle={"国际"} />
							</div>
							<div className="centerContainer">
								<Tabs className="centerContainer-width">
									<TabPane tab="头条" key="1">
										<PCNewsText count={22} type={"top"}/>
									</TabPane>
									<TabPane tab="国际" key="2">
										<PCNewsText count={22} type={"guoji"}/>
									</TabPane>
									<TabPane tab="国内" key="3">
										<PCNewsText count={22} type={"guonei"}/>
									</TabPane>
									<TabPane tab="社会" key="4">
										<PCNewsText count={22} type={"shehui"}/>
									</TabPane>
								</Tabs>
							</div>
							<div className="rightContainer">
								<Tabs className="rightContainer-width">
									<TabPane tab="ReactNews 产品" key="1">
										<PCNewsRef/>
									</TabPane>
								</Tabs>
							</div>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="father-container">
						<div className="second-container">
							<PCNewsImage count={16} type={"yule"} imageTitle={"娱乐"}/>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		)
	}
}