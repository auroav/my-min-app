// pages/question/index.ts
Page({
	data: {
		articleSet: [],
		tigger: false,
		isOver: false,
		_freshing: false,
		firstLoaded: false,
		pagenation: {
			page_size: 10,
			page_no: 1,
			total: 0,
		},
	},
	type: "",
	async onPullDown() {
		this.setData({
			tigger: true,
		});
		const { pagenation } = this.data;
		await this.getCardSet(pagenation.page_size, 1);
		this.setData({
			tigger: false,
		});
	},
	updateFreshing(event: WechatMiniprogram.CustomEvent) {
		this.setData({
			_freshing: event.detail.value,
		});
	},
	getCb() {
		const { pagenation } = this.data;
		this.getCardSet(pagenation.page_size, pagenation.page_no);
	},
	getCardSet(page_size: number, page_no: number) {
		const db = wx.cloud;
		const { articleSet, pagenation, tigger, _freshing } = this.data;
		return db
			.callFunction({
				name: "getQuestion",
				data: {
					page_size,
					page_no,
					type:
						this.type == "choice"
							? "Choice"
							: this.type == "all"
							? ""
							: this.type,
				},
			})
			.then((res) => {
				if (!_freshing) {
					return;
				}
				const data = (res.result as any).response.data;
				const copyData = tigger ? data : articleSet.concat(data);
				const total = (res.result as any).result.total;
				this.setData({
					articleSet: copyData,
					firstLoaded: true,
					pagenation: {
						page_size: pagenation.page_size,
						page_no: copyData.length + 1,
						total,
					},
					isOver: copyData.length + 1 == total,
				});
			})
			.catch(console.error)
			.finally(() => {
				this.setData({
					_freshing: false,
				});
			});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options: Record<string, string>) {
		this.type = options.type;
	},

	jump(event: WechatMiniprogram.CustomEvent) {
		const id = event.currentTarget.dataset.id;
		wx.navigateTo({
			url: `/sub_modules_a/pages/question-detail/index?id=${id}`,
		});
	},
});
