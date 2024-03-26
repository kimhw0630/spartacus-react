"use client";

import React, { useState } from 'react';
import styles from "./cx-searchbox.module.scss";
import { fetchProductSearch, ProductSearchPage, Product, backendUrl, Image } from "hackathon-2023-storefront-sdk";
import CxMedia from "../cx-media/cx-media";

interface Props {
	displayProductImages?: boolean;
	displayProducts?: boolean;
	maxProducts?: number;
	minCharactersBeforeRequest?: number;
}

const CxSearchBox = (props: Props) => {
	const [value, setValue] = useState('');
	const [searchResult, setSearchResult] = useState({} as ProductSearchPage);
	const popupRef = React.createRef<HTMLDivElement>();

	const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setValue(e.target.value);
		if (props?.minCharactersBeforeRequest && value?.length < props.minCharactersBeforeRequest) {
			return;
		}

		fetchProductSearch(value).then((res: ProductSearchPage) => {
			if (props?.maxProducts &&
				res.products?.length &&
				res.products?.length > props.maxProducts) {
				res.products.length = props.maxProducts;
			}
			setSearchResult(res);
			if (res) {
				openPopup();
			} else {
				closePopup();
			}
		})
	};

	const createMarkup = (html: string) => {
		return {__html: html};
	};

	const openPopup = () => {
		if (popupRef?.current) {
			popupRef.current.hidden = false
		}
	};

	const closePopup = () => {
		if (popupRef?.current) {
			popupRef.current.hidden = true
		}
	};

	const getThumbnailImage = (product: Product): Image => {
		if (product?.images) {
			const imgArr: Array<Image> = product.images;
			const image = imgArr.find(img => img.format === 'thumbnail');
			return {
				format: image?.format,
				imageType: image?.imageType,
				url: new URL(backendUrl).origin + image?.url
			};
		}
		return {};
	}


	return (
		<div className={styles['search-box']}>
			<label>
				<input
					autoComplete='off'
					placeholder='Enter product name or SKU'
					value={value}
					onChange={handleChange}
					onFocus={openPopup}
					onBlur={closePopup}
				/>
			</label>

			<div className={styles['result-list']} ref={popupRef}>
				{
					value &&
					searchResult &&
					searchResult.products &&
					searchResult.products.map((product) => (product.name &&
						<div key={product.code} className={styles['result-item']}>
							<div className={styles['thumbnail']}><CxMedia container={getThumbnailImage(product)}></CxMedia></div>
							<div dangerouslySetInnerHTML={createMarkup(product.name)}></div>
							<div>{product.price?.formattedValue}</div>
						</div>
					))}
			</div>
		</div>

	);
}

export default CxSearchBox;
