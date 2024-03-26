export declare type Params = {
	[key: string]: any;
};

export interface RouteParts {
	/** Path in the Angular-like array format */
	path?: string[];

	/** Query params */
	queryParams?: Params;

	/** Hash fragment */
	fragment?: string | null;
}
