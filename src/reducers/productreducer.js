let productList=[]
const productReducer = (state = null , action) => {
    switch(action.type){
        case 'INITIAL_FETCH':
            console.log("producer",action.payload)
            productList = action.payload;
            break;
        case 'DELETE_PRODUCT':
            let id = action.payload
            let newList = productList.filter(product => product.id !== id)
            productList = newList
            break;
        case 'ADD_PRODUCT':
            let newData = action.payload
            productList.push(newData)
            break;
        case 'EDIT_PRODUCT':
            let updatedData = action.payload
            let data = {
                name : updatedData.name,
                price : updatedData.price,
                quantity : updatedData.quantity,
                category : updatedData.category,
                brand : updatedData.brand,
                image : updatedData.image,
                id: updatedData.id
            }
            let index = productList.findIndex(product => product.id === updatedData.id)
            productList[index]=data
            break;
        default:
            break;
    }
    console.log("reducer",productList)
    return productList;
}

export default productReducer;