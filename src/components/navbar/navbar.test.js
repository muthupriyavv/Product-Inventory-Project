import React from 'react'
import Navbar from './navbar'
import {shallow} from 'enzyme';

describe('navbar renders' , () => {
    it('render navbar component correctly', () => {  
        const NavbarComponent = shallow(<Navbar></Navbar>);
        expect(NavbarComponent).toMatchSnapshot();
    });
})