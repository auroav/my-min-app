// sub_modules_b/pages/web-view/index.ts
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		url: "",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		const that = this;
		const eventChannel = this.getOpenerEventChannel();
		// 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
		eventChannel.on("acceptDataFromOpenerPage", function (data) {
			that.setData({
				url: data.data,
			});
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {},

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
