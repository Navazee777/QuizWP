/// <reference types="react" />
import type { IMyQuizWpProps } from './IMyQuizWpProps';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
export interface IListItem {
    Title: string;
    Id: number;
}
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-users";
import "@pnp/sp/profiles";
declare const Quiz: (props: IMyQuizWpProps) => JSX.Element;
export default Quiz;
//# sourceMappingURL=MyQuizWp.d.ts.map