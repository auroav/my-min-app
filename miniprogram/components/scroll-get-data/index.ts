// components/scroll-get-data/index.ts
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tigger: Boolean,
		isOver: Boolean,
		_freshing: Boolean,
	},
	lifetimes: {
		attached: function () {
			// 在组件实例进入页面节点树时执行
			(this as any).init();
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
		},
	},

	options: {
		multipleSlots: true, // 在组件定义时的选项中启用多 slot 支持
		pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		_observer: null,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		init() {
			this.obserLoaddingVisible();
		},
		obserLoaddingVisible() {
			(this as any).data._observer = wx.createIntersectionObserver(this);
			(this as any).data._observer
				.relativeTo(".scroll-view")
				.observe(".scroll-loadding", (res: any) => {
					setTimeout(() => {
						const visible = res.intersectionRatio > 0;
						if (visible) {
							(this as any).triggerEvent("updateFreshing", {
								value: true,
							});
							// 获取数据
							(this as any).triggerEvent("get");
						}
					}, 1000);
				});
		},
		async onRefresh() {
			if ((this as any).properties._freshing) return;
			(this as any).triggerEvent("updateFreshing", {
				value: true,
			});
			(this as any).triggerEvent("pullDown");
		},

		onRestore() {},

		onAbort() {
			(this as any).triggerEvent("updateFreshing", {
				value: false,
			});
		},
	},
});
