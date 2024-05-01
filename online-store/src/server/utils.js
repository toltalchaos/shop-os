// @ts-nocheck

function manageInvintoryAndCartCount(incomingItems) {
    //intakes the order data and returns the items with updated inventory
    const outgoingItems = incomingItems.map(item => {
        const newItem = {...item}; // create a new object with the same properties as item
        newItem.invintory =  newItem.invintory - item.cart_quantity;
        return newItem;
    });
    return sanitizeCartData(outgoingItems);
}

function sanitizeCartData(items) {
    //removes the cart data from the items
    return items.map(item => {
        let newItem = {...item};
        delete newItem.cart_quantity;
        return newItem;
    });
}


function formatNewOrderEmail(orderData) {
    //we want to format the order data into an email to send to the user
    console.log('formatting order email', orderData);
    return orderData;
}

function formatStatusUpdateEmail(orderData) {
    //we want to format the order data into an email to send to the user
    console.log('formatting status update email', orderData);
    return orderData;
}

export {
    manageInvintoryAndCartCount, 
    formatNewOrderEmail,
    formatStatusUpdateEmail,
    sanitizeCartData}