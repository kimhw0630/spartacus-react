"use client";

import Link from 'next/link';
import styles from './cx-generic-link.module.scss';

// import { RouteParts } from './cx-generic-link.model';

interface Props {
	url?: string | any[];
	target?: string | null;
	id?: string;
	class?: string;
	style?: any;  // Todo we might need to convert to style object
	title?: string;
	children?: any;
	external?: boolean;
}

const CxGenericLink = (props: Props) => {
	let targetUrl = typeof props.url === 'string' ? props.url : '/'

	// TODO we might need to parse to handle navigate..
	// we can parse and use useRouter() or pass

	// let routeParts: RouteParts = {};
	// let targetUrl = '';
	// let queryParams = '';
	// let fragment = '';
	// const isExternal = isExternalUrl(props.url);
	// if (typeof props.url === 'string') {
	// 	targetUrl = getAbsoluteUrl(props.url); // string links in CMS sometimes don't have the leading slash, so fix it here
	// 	routeParts = splitUrl(targetUrl);
	// } else {
	// 	routeParts = { path: props.url };
	// }
	// if (!isExternal) {
	// 	targetUrl = routeParts.path;
	// 	// queryParams = routeParts.queryParams;
	// 	// fragment = routeParts.fragment;
	// }
	// // should we move to util or SDK?
	// function isExternalUrl(url: string | any[] | undefined): boolean {
	// 	const HTTP_PROTOCOL_REGEX: RegExp = /^https?:\/\//i;
	// 	const MAILTO_PROTOCOL_REGEX: RegExp = /^mailto:/i;
	// 	const TEL_PROTOCOL_REGEX: RegExp = /^tel:/i;

	// 	return (
	// 		typeof url === 'string' &&
	// 		(HTTP_PROTOCOL_REGEX.test(url) ||
	// 			MAILTO_PROTOCOL_REGEX.test(url) ||
	// 			TEL_PROTOCOL_REGEX.test(url))
	// 	);
	// }
	// function getAbsoluteUrl(url: string): string {
	// 	return url.startsWith('/') ? url : '/' + url;
	// }
	// function splitUrl(url: string = ''): any { //any is RouteParts
	// 	const URL_SPLIT = /(^[^#?]*)(.*)/;
	// 	// TODO: we need another parser maybe URLSearchParams??
	// 	// const { queryParams, fragment } = this.router.parseUrl(url);
	// 	const queryParams = '';
	// 	const fragment = '';
	// 	const [, path] = url.match(URL_SPLIT) ?? [, ''];
	// 	// wrap path in an array, to have the Angular-like path format
	// 	return { path: [path ?? ''], queryParams, fragment };
	// }

	const rel = props.external ? 'noopener noreferrer' : undefined;
	let className = styles['cx-generic-link'];

	props.class && (className = className + ` ${props.class}`);

	return (
		<Link
			href={`${targetUrl}`}
			rel={rel}
			{...(props.title && { title: props.title })}
			{...(props.style && { style: props.style })}
			className={className}
			{...(props.id && { id: props.id })}
			{...(props.target && { target: props.target })}
			passHref={true}
		>{props.children}</Link>
	)
}

export default CxGenericLink
