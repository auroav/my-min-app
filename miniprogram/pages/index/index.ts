const db = wx.cloud;
import { CardSet, QuickEntrance } from "../../data/common/card";
Page<IndexPage.PageDataType, Record<string, any>>({
	/**
	 * 页面的初始数据
	 */
	data: {
		bannerList: [],
		indicatorDots: true,
		vertical: false,
		autoplay: true,
		interval: 2000,
		duration: 500,
		CardSet,
		QuickEntrance,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		db.callFunction({
			name: "getBanner",
		})
			.then((res) => {
				this.setData({
					bannerList: (res.result as AnyObject).data!,
				});
			})
			.catch(console.error);
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
				selected: 0,
			});
		}
	},

	jump(event: WechatMiniprogram.CustomEvent) {
		const key = event.currentTarget.dataset.key;
		wx.navigateTo({
			url: "/sub_modules_a/pages/question/index" + "?type=" + key,
		});
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
});
