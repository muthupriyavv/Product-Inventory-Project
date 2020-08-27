import React from 'react'
import {shallow} from 'enzyme';
import SignUp from './signup';

describe('Signup component test', () => {
    const wrapper = shallow(<SignUp />)

    it('should have a btn component', ()=> {
        //There should be only one button
        expect(wrapper.find('button')).toHaveLength(1);

        //Button should have matching text
        expect(wrapper.find('button').text()).toEqual('REGISTER');
    }); 

    it('should have a matching text', ()=> {
        //Button should have matching text
        expect(wrapper.find('button').text()).toEqual('REGISTER');
    }); 

    it('should have input for email,', ()=> {
        //Email and password input field should be present
        expect(wrapper.find('input#email')).toHaveLength(1);
    });

    it('should have input for password,', ()=> {
        //Email and password input field should be present
        expect(wrapper.find('input#password')).toHaveLength(1);
    });

    it('should have input for pswrepeat,', ()=> {
        //Email and password input field should be present
        expect(wrapper.find('input#pswrepeat')).toHaveLength(1);
    });

})