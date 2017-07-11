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
	Input,
	Link,
	Card,
	notification
} from 'antd';


const FormItem = Form.Item;

class CommonComments extends React.Component{
	constructor(){
		super();
		this.state={
			comments:''
		}
	}

	componentDidMount(){
		var FetchOptions={
			method:'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
			+this.props.uniquekey,FetchOptions)
		.then(response=>response.json())
		.then(json=>{
			json.reverse();
			this.setState({comments:json});
			}
		)
	}

	handleSubmit(e){
		e.preventDefault();
		var FetchOptions={
			method:'GET'
		};
		var formData = this.props.form.getFieldsValue();
		
		this.props.form.validateFields((err, values) => {
		    if (!err) {
		       	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
				+localStorage.userId
				+"&uniquekey="+this.props.uniquekey
				+"&commnet="+formData.userComment
				,FetchOptions)
		       	.then(()=>{
		       		this.componentDidMount();
		       		console.log(values.userComment)
		       	})
		    }
		});
		this.refs.textarea.value='';
	}

	addUserCollection(){
		var FetchOptions={
			method:'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
			+localStorage.userId
			+"&uniquekey="+this.props.uniquekey
			,FetchOptions)
		.then(response=>response.json())
		.then(json=>{
			// 收藏之后的提醒
			notification.success({
    			message: 'React News的提醒',
    			description: '收藏文章成功',
  			})
		})
	}

	render(){

		const comments = this.state.comments;

		const commentLength = `所有评论：${comments.length}条`;

		const commentsList = comments.length
		?
		comments.map((item,index)=>{
				return(
					<div style={{marginBottom:10}} key={index}>
						<Card title={item.UserName} extra={<a href="#">{item.datetime}</a>}>
							<p>{item.Comments}</p>
						</Card>
					</div>	
				)
		})
		:
		"没有加载到任何评论";

		const { getFieldDecorator } = this.props.form;

		return (
			<div className='comments'>
				<Card>
					<h3>{commentLength}</h3>
					<Form onSubmit={this.handleSubmit.bind(this)}>
						<FormItem ref="textarea">
					        {getFieldDecorator('userComment')(
					        	<textarea className="textarea"></textarea>
					        )}
						</FormItem>
						<Button type='primary' htmlType='submit'>发表评论</Button>
						&nbsp;&nbsp;
						<Button type='primary' htmlType='button' onClick={this.addUserCollection.bind(this)}>收藏文章</Button>
					</Form>
					<br/>
					{commentsList}
				</Card>
			</div>
		)
	}
}

export default CommonComments = Form.create()(CommonComments);

