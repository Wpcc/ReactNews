var path=require('path');
var htmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
	entry:{
		page1:'./src/js/root.js'
	},

	output:{
		path:path.resolve(__dirname,'./build'),
		filename:'js/[name].bundle.js',
		//publicPath:'/assets/'
	},
	plugins:[
		new htmlWebpackPlugin({
			filename:'index.html',
			template:'src/index.html',
			inject:'body',
			title:'index',
			chunks:['page1']
		})
	],
	//devtool:'source-map',  //直接生成sorce-map文件
	module:{
		loaders:[
		{test:/\.css$/,loader:'style-loader!css-loader'},
		//{test:/\.css$/,loader:'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'},
		{test:/\.js$/,loader:'react-hot-loader!babel-loader',exclude:/node_modules/}
		]
	}
}

