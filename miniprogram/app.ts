// app.ts
App<IAppOption>({
	globalData: {},
	// // // 引入`towxml3.0`解析方法
	// towxml: require("/towxml/index"),
	onLaunch() {
		wx.cloud.init({
			env: "app0107-3g263cbzf2bd6d1d",
		});
		// // 登录
		// wx.login({
		// 	success: (res) => {
		// 		console.log(res);
		// 		// 发送 res.code 到后台换取 openId, sessionKey, unionId
		// 	},
		// });
	},
});
