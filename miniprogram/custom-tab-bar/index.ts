Component({
	data: {
		selected: 0,
		color: "#7A7E83",
		selectedColor: "#3cc51f",
		list: [
			{
				pagePath: "/pages/index/index",
				iconPath: "/data/png/icon_component.png",
				selectedIconPath: "/data/png/icon_component_HL.png",
				text: "首页",
			},
			{
				pagePath: "/pages/learn/index",
				iconPath: "/data/png/icon_API.png",
				selectedIconPath: "/data/png/icon_API_HL.png",
				text: "学习",
			},
			{
				pagePath: "/pages/user/index",
				iconPath: "/data/png/user.png",
				selectedIconPath: "/data/png/user_select.png",
				text: "我的",
			},
		],
	},
	attached() {},
	methods: {
		switchTab(e: WechatMiniprogram.BaseEvent) {
			const data = e.currentTarget.dataset;
			const url = data.path;
			wx.switchTab({ url });
			this.setData({
				selected: data.index,
			});
		},
	},
});
