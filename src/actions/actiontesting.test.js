import addProduct from './addproductaction'
import editProduct from './editProduct'
import initialList from './initialList'
import removeProduct from './deleteProduct'

describe('add product', () => {
  it('should create an action to add a product', () => {
    const prod =[]
    const expectedAction = {
      type: "ADD_PRODUCT",
      payload:[]
    }
    expect(addProduct(prod)).toEqual(expectedAction)
  })

})

describe('edit product', () => {
    it(' action to edit a product', () => {
      const prod =[]
      const expectedAction = {
        type: "EDIT_PRODUCT",
        payload:[]
      }
      expect(editProduct(prod)).toEqual(expectedAction)
    })
  
  })

  describe('initial product', () => {
    it('initial product', () => {
      const prod =[]
      const expectedAction = {
        type: "INITIAL_FETCH",
        payload:[]
      }
      expect(initialList(prod)).toEqual(expectedAction)
    })
  
  })

  describe('delete product', () => {
    it('delete product', () => {
      const id =""
      const expectedAction = {
        type: "DELETE_PRODUCT",
        payload: id
      }
      expect(removeProduct(id)).toEqual(expectedAction)
    })
  
  })