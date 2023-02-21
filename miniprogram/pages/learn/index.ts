// pages/learn/index.ts
const db = wx.cloud;
Page<LearnPage.PageDataType, Record<string, any>>({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabIdx: "1",
		articleSet: [],
		firstLoad: false,
		isOver: false,
		tigger: false,
		pagenation: {
			page_size: 4,
			page_no: 1,
			total: 0,
		},
	},
	_freshing: false,
	/**
	 * 生命周期函数--监听页面加载
	 */
	onReady() {
		this.init();
	},
	init() {
		this.obserLoaddingVisible();
	},
	obserLoaddingVisible() {
		this._observer = wx.createIntersectionObserver(this);
		this._observer
			.relativeTo(".scroll-view")
			.observe(".scroll-loadding", (res: any) => {
				const { pagenation } = this.data;
				const visible = res.intersectionRatio > 0;
				if (visible) {
					this._freshing = true;
					this.getCardSet(pagenation.page_size, pagenation.page_no);
				}
			});
	},
	getCardSet(page_size: number, page_no: number, cb?: (total: number) => void) {
		const { tabIdx, articleSet, pagenation, tigger } = this.data;
		return db
			.callFunction({
				name: "getArticle",
				data: {
					type: tabIdx,
					page_size,
					page_no,
				},
			})
			.then((res) => {
				if (!this._freshing) {
					return;
				}
				const data = (res.result as any).response.data;
				const copyData = tigger ? data : articleSet.concat(data);
				const total = (res.result as any).result.total;
				this.setData(
					{
						articleSet: copyData,
						firstLoad: true,
						pagenation: {
							page_size: pagenation.page_size,
							page_no: copyData.length + 1,
							total,
						},
						isOver: copyData.length + 1 == total,
					},
					() => {
						if (cb) {
							cb(total);
						}
					}
				);
			})
			.catch(console.error)
			.finally(() => {
				this._freshing = false;
			});
	},

	jump(event: WechatMiniprogram.CustomEvent) {
		const url = event.currentTarget.dataset.url;
		console.log(url, "url");

		wx.navigateTo({
			url: "/sub_modules_b/pages/web-view/index",
			success: function (res) {
				// 通过 eventChannel 向被打开页面传送数据
				res.eventChannel.emit("acceptDataFromOpenerPage", { data: url });
			},
		});
	},

	async onRefresh() {
		if (this._freshing) return;
		this._freshing = true;
		const { pagenation } = this.data;
		this.setData({
			tigger: true,
		});
		await this.getCardSet(pagenation.page_size, 1);
		this.setData({
			tigger: false,
		});
	},

	onRestore() {},

	onAbort() {
		this._freshing = false;
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		if (typeof this.getTabBar === "function" && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 1,
			});
		}
	},
	onUnload() {
		if (this._observer) this._observer.disconnect();
	},

	onTabsChange(event: WechatMiniprogram.CustomEvent) {
		this.setData({
			tabIdx: event.detail.value,
			pagenation: {
				page_size: 4,
				page_no: 1,
				total: 0,
			},
			articleSet: [],
			isOver: false,
			tigger: false,
			firstLoad: false,
		});
	},
});
