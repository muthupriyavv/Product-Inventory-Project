import React from 'react';
import {shallow} from 'enzyme';
import Login from './login'


describe('Login Component test', () => {
    const wrapper = shallow(<Login />)

    it('should have a btn component', ()=> {
        //There should be only one button
        expect(wrapper.find('button')).toHaveLength(1);

        //Button should have matching text
        expect(wrapper.find('button').text()).toEqual('LOGIN');
    }); 

    it('should have a matching text', ()=> {
        //Button should have matching text
        expect(wrapper.find('button').text()).toEqual('LOGIN');
    }); 

    it('should have input for email', ()=> {
        //Email  input field should be present
        expect(wrapper.find('input#email')).toHaveLength(1);
    });

    it('should have input for password', ()=> {
        expect(wrapper.find('input#password')).toHaveLength(1);
    });

    it('should have an empty email state var', ()=> {
        expect(wrapper.state('email')).toEqual('');
    });

    it('should have an empty password state var', ()=> {
        expect(wrapper.state('password')).toEqual('');
    });

})