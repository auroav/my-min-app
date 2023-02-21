// pages/user/index.ts
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		hasUserInfo: false,
		canIUseGetUserProfile: false,
		userInfo: {},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		const obj: Record<string, any> = {};
		// @ts-ignore
		if (wx.getUserProfile) {
			obj.canIUseGetUserProfile = true;
		}
		const userInfo = wx.getStorageSync("user");
		if (userInfo) {
			obj.hasUserInfo = true;
			obj.userInfo = userInfo;
		}
		if (Object.keys(obj).length > 0) {
			this.setData(obj);
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		if (typeof this.getTabBar === "function" && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 2,
			});
		}
	},
	getUserProfile() {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		const that = this;
		wx.showModal({
			title: "提示",
			content: "是否允许获取头像昵称",
			success(res) {
				if (res.confirm) {
					wx.getUserProfile({
						desc: "获取用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							that.setData({
								userInfo: res.userInfo,
								hasUserInfo: true,
							});
							wx.setStorageSync("user", res.userInfo);
						},
					});
				} else if (res.cancel) {
					console.log("用户点击取消");
				}
			},
		});
	},
	jump(event: WechatMiniprogram.CustomEvent) {
		const key = event.currentTarget.dataset.key;
		if (key == "collect") {
			wx.navigateTo({
				url: "/sub_modules_a/pages/question/index",
			});
			return;
		} else if (key == "cb" || key == "call") {
			return;
		} else if (key == "share") {
			return;
		} else if (key == "address") {
			return;
		}
		wx.navigateTo({
			url: "/sub_modules_b/pages/info/index",
		});
	},
	bindcontact(event: any) {
		console.log(event, "bindcontact");
	},
	getPhoneNumber(event: any) {
		console.log(event, "code");
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {},
});
