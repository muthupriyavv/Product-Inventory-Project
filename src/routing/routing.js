import Login from '../components/login/login'
import Dashboard from '../components/dashboard/dashboard'
import Product from '../components/products/product'
import AddProduct from '../components/products/addproducts/addproducts'
import EditModel from '../components/products/editmodel/editmodel'
import SignUp from '../components/signup/signup'


const routes = [
    {
        path:"/login",
        component: Login
    },
    {
        path:"/signup",
        component: SignUp
    },
    {
        path:"/dashboard",
        component: Dashboard
    },
    {
        path:"/products",
        component: Product
    },
    {
        path:"/products/addproduct",
        component:AddProduct
    },
    {
        path:"/products/editproduct/:id",
        component:EditModel
    }
]

export default routes;

