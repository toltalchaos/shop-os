// @ts-nocheck

export function getExistingCategories(products) {
    function checkArrayItems(accArray, categoryArray) {
        //if the accumulator array is empty, return the category array
        if (!accArray) {
            return categoryArray;
        }
        // check if the category array has items belonging to the accumulator array
        let items = categoryArray.filter((item) => {
            return accArray.includes(item);
        });
        //remove the items from the category array rhe belong to the accumulator array
        let newCategoryArray = categoryArray.filter((item) => {
            return !items.includes(item);
        });
        //return the new category array
        return newCategoryArray;
    }
  //sort the products by product.category into individual arrays of products by the category as a key
	let productsByCategory = products.reduce((acc, product) => {
		//check if the category on this product exists in the accumulator
		product.category = product.category ? product.category : []; //handling undefined category
		let newCategories = checkArrayItems(Object.keys(acc), product.category);
		for (let category of newCategories) {
			acc[category] = [];
		}
		if (newCategories) {
			//if it doesn't exist, create an array with the category as the key
			for (let category of newCategories) {
				acc[category] = [];
			}
		}
		//push the product into the array with the category as the key
		for (let category of product.category) {
			acc[category].push(product);
		}
		delete acc.undefined; //keep undefined from being a category
		return acc;
	}, {});
    return productsByCategory;
}

