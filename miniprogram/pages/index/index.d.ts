declare module IndexPage {
	export interface PageDataType {
    bannerList: Record<"_id" | "image" | "title" | "url", string>[];
    indicatorDots: boolean;
    vertical: boolean;
    autoplay: boolean;
    interval: number;
    duration: number;
    CardSet: Record<string, string>[];
    QuickEntrance: Record<string, string>[];
}
}