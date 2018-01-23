import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
export declare class Common extends StackLayout {
    private replytoWraper;
    reviews: any;
    scroll: any;
    showHeader: any;
    imagetag: any;
    private initscroll;
    title: string;
    private rep;
    private scrollview;
    plugin: any;
    sendText: string;
    private likeQ;
    private headtitle;
    dateHandler: any;
    static userEvent: string;
    static longEvent: string;
    reviewCount(): string;
    userNameAction(args: any): void;
    userImageAction(args: any): void;
    userAction(id: any): void;
    LongPress(args: any): void;
    init(): void;
    refresh(): void;
    constructor();
    private parseOptions(view, options);
}
