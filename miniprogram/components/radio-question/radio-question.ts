// components/radio-question.ts
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		list: {
			type: Array,
			value: [],
		},
		title: String,
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		checked: "",
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		radioChange(e: WechatMiniprogram.CustomEvent) {
			console.log("radio发生change事件，携带value值为：", e.detail.value);
			const { list } = this.properties;
			for (let i = 0, len = list.length; i < len; ++i) {
				list[i].checked = list[i].value === e.detail.value;
			}
			// setData 不会深拷贝，（深复制会在这个值被组件间传递时发生。）
			this.setData({
				checked: e.detail.value == this.data.checked ? "" : e.detail.value,
			});
		},
	},
});
