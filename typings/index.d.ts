/// <reference path="./types/index.d.ts" />

interface IAppOption {
	globalData: {
		userInfo?: WechatMiniprogram.UserInfo;
	};
	userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
	towxml?: any;
}
declare module "*.svg" {
	const content: string;
	export default content;
}
