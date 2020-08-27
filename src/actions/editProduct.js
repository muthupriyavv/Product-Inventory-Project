const editProduct = (data) => {
    return{
        type : "EDIT_PRODUCT",
        payload: data
    }
}

export default editProduct;