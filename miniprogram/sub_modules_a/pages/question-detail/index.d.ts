/// <reference path="../../../../typings/types/index.d.ts" />
declare module DetailQuestionPage {
	export interface PageDataType {
		title: string;
		prve: string;
		next: string;
		level: string;
		updateAt: string;
		desc?: Record<string, any> | null;
		renderType: string;
		category: "QA" | "Choice";
		explanation: string;
	}
}
