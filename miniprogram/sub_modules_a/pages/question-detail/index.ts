// pages/question-detail/index.ts
//获取应用实例
const app = getApp();
Page<Record<string, any>, Record<string, any>>({
	/**
	 * 页面的初始数据
	 */
	data: {
		item: {
			level: 0,
		},
		loading: false,
		page: 1,
		show: false,
		article: {},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options: Record<string, string>) {
		this.setData({
			loading: true,
		});
		this.getDetail(options.id);
	},
	getDetail(id: string) {
		this.db = wx.cloud;
		this.db
			.callFunction({
				name: "getQuestionAnswer",
				data: {
					id,
				},
			})
			.then(async (res: any) => {
				const towxml = await require.async("../../../towxml/index.js");

				const data = (res.result as any).data[0];
				if (data.options) {
					data.options = JSON.parse(data.options);
					data.desc = towxml(data.desc, "markdown", {
						// base:'https://xxx.com',				// 相对资源的base路径
						theme: "dark", // 主题，默认`light`
					});
				}
				let article = towxml(data.explanation, "markdown", {
					// base:'https://xxx.com',				// 相对资源的base路径
					theme: "light", // 主题，默认`light`
				});
				this.setData({
					article,
					item: data,
				});
			})
			.catch(console.error)
			.finally(() => {
				this.setData({
					loading: false,
				});
			});
	},
	setShow() {
		this.setData({
			show: !this.data.show,
		});
	},
	jump(event: WechatMiniprogram.CustomEvent) {
		const { id, type } = event.currentTarget.dataset;
		const { page } = this.data;
		this.setData({
			page: type == "ins" ? page - 1 : page + 1,
		});
		this.getDetail(id);
	},
	collectFn(event: WechatMiniprogram.CustomEvent) {
		this.db
			.callFunction({
				name: "addCollect",
				data: {
					id: event.currentTarget.dataset.id,
				},
			})
			.then(() => {
				wx.showToast({
					title: "添加成功",
					icon: "success",
				});
			})
			.catch(() => {
				wx.showToast({
					title: "添加失败",
					icon: "none",
				});
			});
	},
	onRadioChange(event: WechatMiniprogram.CustomEvent) {
		if (event.detail.value == event.currentTarget.dataset.answer.join(",")) {
			wx.showToast({
				title: "答对了",
				icon: "success",
			});
		} else {
			wx.showToast({
				title: "答错了",
				icon: "error",
			});
		}
		this.setData({
			show: true,
		});
	},
});
