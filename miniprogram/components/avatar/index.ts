// components/avatar/index.ts

Component({
  externalClasses: ["d-class"],
	/**
	 * 组件的属性列表
	 */
	properties: {
    userInfo: Object,
    canIUseGetUserProfile: Boolean,
    hasUserInfo: Boolean
  },

	/**
	 * 组件的初始数据
	 */
	data: {
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
    getUserProfile() {
      (this as any).triggerEvent("user");
    },
  },
});
