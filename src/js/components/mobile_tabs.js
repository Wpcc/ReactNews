import React from 'react';
import {Tabs, Carousel} from 'antd';

const TabPane = Tabs.TabPane;

import MobileNewsText from './mobile_news_text.js';

export default class MobileTabs extends React.Component{
	render(){
		return(
			<div id='tabs'>
				<Tabs>
					<TabPane tab="头条" key="1">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'top'} count={15}/>
					</TabPane>
					<TabPane tab="社会" key="2">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'shehui'} count={15}/>
					</TabPane>
					<TabPane tab="国内" key="3">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'guonei'} count={15}/>
					</TabPane>
					<TabPane tab="国际" key="4">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'guoji'} count={15}/>
					</TabPane>
					<TabPane tab="娱乐" key="5">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'yule'} count={15}/>
					</TabPane>
					<TabPane tab="体育" key="6">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'tiyu'} count={15}/>
					</TabPane>
					<TabPane tab="科技" key="7">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'keji'} count={15}/>
					</TabPane>
					<TabPane tab="时尚" key="8">
						<Carousel autoplay className="carousel">
						    <div><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
						<MobileNewsText type={'shishang'} count={15}/>
					</TabPane>				
				</Tabs>
			</div>
		)
	}
}