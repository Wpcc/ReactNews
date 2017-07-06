import React from 'react';
import { Row, Col } from 'antd';

// 路由
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// 导航按钮
import { 
	Menu,
	Icon,
	message,
	Form,
	Button,
	CheckBox,
	Modal,
	Tabs,
	Input
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;//标签页

class PCHeader extends React.Component{
	constructor(...args){
		super(...args);
		this.state={
			current:'toutiao', //导航条开始选中‘头条’
			modalVisible:false, //对话框状态--不显示
			action:'login',	//按钮行为--登录
			hasLogined:false, //是否登录--没有
			userNickName:'', //用户昵称--空
			userId:0 //用户Id--0

		} 
	}

	// 本地储存，储存用户信息
	componentWillMount(){
		if(localStorage.userId!=''){
			this.setState({
				hasLogined:true,
				userNickName:localStorage.userNickName,
				userId:localStorage.userId
			})
		}
	}

	// 获取事情并更改状态，值得注意的是此处event 该event=event.taget
	// 注册、登录的点击事件
	handleClick(event){
		console.log(event.key)
		if(event.key == "register"){
			this.setState({
				modalVisible:true,
			})
		}
		
		this.setState({
			current:event.key,
		})
		
	}

	//注册页面
	handleOk(){	
	    this.setState({
	     	modalVisible: false,
	    });
	}
	handleCancel(){
	    this.setState({
	      	modalVisible: false,
	    });
	}

	//表单信息
	handleSubmit(e){
		//页面开始向api进行提交数据
		e.preventDefault();  //阻止事件冒泡
		var myFetchOptions = {
			method:'GET'
		};
		this.props.form.validateFields((err, values) => {
		    if (!err) {
		       	console.log('Received values of form: ', values);
		       	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
		       		+"&userName="+values.userName
		       		+"&password="+values.password
		       		+"&r_userName="+values.r_userName
		       		+"&r_password="+values.r_password
		       		+"&r_confirmPassword="+values.r_confirmPassword,myFetchOptions)
		       	.then(response=>response.json())
		       	.then(json=>{
		       		this.setState({userNickName:json.NickUserName,userid:json.UserId});
		       		localStorage.userId=json.UserId;
		       		localStorage.userNickName=json.NickUserName;
		       	})
		    	message.success("请求成功！");
		    	this.setState({
		    		modalVisible:false,
		    	})
		    	if(this.state.action=="login"){
		    		this.setState({
		    			hasLogined:true,
		    		})
		    	}
		    }
		});
		
	}

	// 登录标签页
	callback(key){
		if(key==1){
			this.setState({action:'login'})
		}
		else if(key==2){
			this.setState({action:'register'})
		}
	}

	// 用户退出
	logout(){
		localStorage.userId='';
		localStorage.userNickName='';
		this.setState({
			hasLogined:false
		})
	}

	render(){
		
		const { getFieldDecorator } = this.props.form;//获取表单的值
		
		const userShow = this.state.hasLogined
		?
		//用户已经登录
		<Menu.Item key='logup' className='login'>
			<Button type='primary' htmlType='button'>{this.state.userNickName}</Button>
			&nbsp;&nbsp;
			
			<Button htmlType='button'>个人中心</Button>
			
			&nbsp;&nbsp;
			<Button htmlType='button' type='danger' onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item>
		: 
		//用户还没登录
		<Menu.Item key='register' className='register'>
			<Icon type="appstore" />注册/登录
		</Menu.Item>;

		

		

		return(
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className='logo'>
							<img src="src/img/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
							<Menu.Item key='toutiao'><Icon type="appstore" />头条</Menu.Item>
							<Menu.Item key='shehui'><Icon type="appstore" />社会</Menu.Item>
							<Menu.Item key='guolei'><Icon type="appstore" />国内</Menu.Item>
							<Menu.Item key='guoji'><Icon type="appstore" />国际</Menu.Item>
							<Menu.Item key='yule'><Icon type="appstore" />娱乐</Menu.Item>
							<Menu.Item key='tiyu'><Icon type="appstore" />体育</Menu.Item>
							<Menu.Item key='keji'><Icon type="appstore" />科技</Menu.Item>
							<Menu.Item key='shishang'><Icon type="appstore" />时尚</Menu.Item>
							{userShow}
						</Menu>

						<Modal title='用户中心' visible={this.state.modalVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} okText='关闭'>
							<Tabs type='card' onChange={this.callback.bind(this)}>
								<TabPane tab="登录" key="1">
									<Form onSubmit={this.handleSubmit.bind(this)} className='login-form'>
										<FormItem>
											{getFieldDecorator('userName')(
									        	<Input placeholder="请输入你的账号"/>
									        )}
										</FormItem>
										<FormItem>
								        	{getFieldDecorator('password')(
								            	<Input type="password" placeholder="请输入你的密码" />
								        	)}
								        </FormItem>
										<FormItem>
											<Button type='primary' htmlType='submit'>提交</Button>
										</FormItem>
									</Form>
								</TabPane>
								<TabPane tab="注册" key="2">
									<Form onSubmit={this.handleSubmit.bind(this)} className='login-form'>
										<FormItem>
											{getFieldDecorator('r_userName')(
									        	<Input placeholder="请输入你的账号"/>
									        )}
										</FormItem>
										<FormItem>
								        	{getFieldDecorator('r_password')(
								            	<Input type="password" placeholder="请输入你的密码" />
								        	)}
								        </FormItem>
										<FormItem>
								        	{getFieldDecorator('r_confirmPassword')(
								            	<Input type="password" placeholder="请确认你的密码"/>
								        	)}
								        </FormItem>
										<FormItem>
											<Button type='primary' htmlType='submit'>提交</Button>
										</FormItem>
									</Form>
								</TabPane>						
							</Tabs>
						</Modal>
						
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		)
	}
}

export default PCHeader = Form.create()(PCHeader);
