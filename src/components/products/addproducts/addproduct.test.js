import React from 'react';
import AddProduct from './addproducts'
import configureMockStore from "redux-mock-store"
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, getByTestId } from '@testing-library/react';
const mockStore =  configureMockStore([])

describe('addproducts', () => {
    let store
    beforeEach(() => {
        store= mockStore({
            productList: [{
                id:"1",
                name:"test",
                category:"electronics",
                brand:"aaa",
                quantity:"100",
                image: null
            }]
        })
    })

    it("should render add products", () => {
        const { getByPlaceholderText } = render(
            <BrowserRouter>
            <Provider store={store}>
                <AddProduct />
            </Provider>
            </BrowserRouter>
        )
    getByPlaceholderText("ENTER NAME")
    })

    it("should render add products", () => {
        const { getByPlaceholderText } = render(
            <BrowserRouter>
            <Provider store={store}>
                <AddProduct />
            </Provider>
            </BrowserRouter>
        )
    getByPlaceholderText("ENTER PRICE")
    })

    it("should render add products", () => {
        const { getByPlaceholderText } = render(
            <BrowserRouter>
            <Provider store={store}>
                <AddProduct />
            </Provider>
            </BrowserRouter>
        )
    getByPlaceholderText("ENTER BRAND")
        })

    it("should render add products", () => {
        const { getByPlaceholderText } = render(
            <BrowserRouter>
            <Provider store={store}>
                <AddProduct />
            </Provider>
            </BrowserRouter>
        )
    getByPlaceholderText("ENTER QUANTITY")
        })

        
    it("should render add products", () => {
        const { getByTestId } = render(
            <BrowserRouter>
            <Provider store={store}>
                <AddProduct />
            </Provider>
            </BrowserRouter>
        )
        getByTestId("submit")
        })


})