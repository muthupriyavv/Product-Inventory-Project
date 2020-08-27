function removeProduct(id){
    return {
        type:"DELETE_PRODUCT",
        payload: id
    }
}

export default removeProduct;