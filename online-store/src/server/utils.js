// @ts-nocheck

function manageInvintoryAndCartCount(incomingItems) {
	//intakes the order data and returns the items with updated inventory
	const outgoingItems = incomingItems.map((item) => {
		const newItem = { ...item }; // create a new object with the same properties as item
		newItem.invintory = newItem.invintory - item.cart_quantity;
		return newItem;
	});
	return sanitizeCartData(outgoingItems);
}

function sanitizeCartData(items) {
	//removes the cart data from the items
	return items.map((item) => {
		let newItem = { ...item };
		delete newItem.cart_quantity;
		return newItem;
	});
}

function sanitizeOrderData(orderData) {
	//removes the image data, invintory info stock data from the order
	orderData.items = orderData.items.map((item) => {
		let newItem = { ...item };// create a new object with the same properties as item
		delete newItem.image;
		delete newItem.invintory;
		return newItem;
	});
    return orderData;
}

export { manageInvintoryAndCartCount, sanitizeCartData, sanitizeOrderData };
