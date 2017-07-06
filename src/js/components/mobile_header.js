import React from 'react';
import { Row, Col } from 'antd';

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
	Input,
	Link
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;//标签页

class MobileHeader extends React.Component{
	constructor(...args){
		super(...args);
		this.state={
			modalVisible:false, //对话框状态--不显示
			action:'login',	//按钮行为--登录
			hasLogined:false, //是否登录--没有
			userNickName:'', //用户昵称--空
			userId:0 //用户Id--0

		} //导航条开始选中‘头条’
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
	handleClick(event){
		console.log(event.key)
		if(event.key == "register"){
			this.setState({
				modalVisible:true,
			})
		}
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

	login(){
		this.setState({
			modalVisible:true
		})
	}
	//登出事件
	logout(){
		localStorage.userId='';
		localStorage.userNickName='';
		this.setState({
			hasLogined:false
		})
		message.success("退出！");
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

	render(){
		const { getFieldDecorator } = this.props.form;//获取表单的值

		const userShow = this.state.hasLogined
		?  //用户已经登录
		
		<Icon type="inbox" onClick={this.logout.bind(this)}/>
		
		:  //用户还没登录
		<Icon type="setting" onClick={this.login.bind(this)} />

		return(
			<header id='mobileHeader'>
				<img src="/src/img/logo.png" alt="log"/>
				<span>ReactNews</span>
				{userShow}

				<Modal title='用户中心' visible={this.state.modalVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} okText='关闭'>
					<Tabs type='card' onChange={this.callback.bind(this)}>
					<TabPane tab="登录" key="1" onChange={this.callback.bind(this)}>
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
						            	<Input type="password" placeholder="请重复你的密码"/>
						        	)}
						        </FormItem>
								<FormItem>
									<Button type='primary' htmlType='submit'>提交</Button>
								</FormItem>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</header>
		)
	}
}

export default MobileHeader = Form.create({})(MobileHeader);