/// <reference path="../../../typings/types/index.d.ts" />
declare module LearnPage {
	export interface PageDataType {
		articleSet: (Record<string, string> & { id: number })[];
		tabIdx: "1" | "2";
    pagenation: Record<"page_size" | "page_no" | "total", number>;
    isOver: boolean,
    tigger: boolean,
    firstLoad: boolean,
	}
}
