import React from 'react';
// import { render } from '@testing-library/react';
import Question from '../app/modules/question-old/question.jsx';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<Question {...props} />);
    if (state)
        wrapper.setState(state);
    return wrapper;
}
const findByAttr = (wrapper, val) => {
    return wrapper.find(`[data_test='${val}']`);
}

describe('Check rendering of Components', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = setup();
    })
    test('Renders Dropdown', () => {
        // const component = wrapper.find(`[data_test='dropdown']`);
        const component = findByAttr(wrapper, 'dropdown');
        expect(component.length).toBe(1);
    })
    test('Renders Ques', () => {
        const component = findByAttr(wrapper, 'ques');
        expect(component.length).toBe(1);
    })
    test('Renders Options', () => {
        const component = findByAttr(wrapper, 'options');
        expect(component.length).toBe(1);
    })
    test('Renders Add Option Button', () => {
        const component = findByAttr(wrapper, 'addOptionBtn');;
        expect(component.length).toBe(1);
    })
    test('Renders Submit Button', () => {
        const component = findByAttr(wrapper, 'submitBtn');;
        expect(component.length).toBe(1);
    })
})

describe('Check props of the component', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = setup();
    })
    it('should have proper props for Dropdown', () => {
        expect(findByAttr(wrapper, 'dropdown').prop('value')).toEqual(expect.any(Number));
        expect(findByAttr(wrapper, 'dropdown').prop('options')).toEqual(expect.any(Array));
        expect(findByAttr(wrapper, 'dropdown').prop('onChange')).toEqual(expect.any(Function));
        expect(findByAttr(wrapper, 'dropdown').prop('onChange')).toEqual(expect.any(Function));
    });
    it('should have proper props for ques', () => {
        expect(findByAttr(wrapper, 'ques').props()).toEqual({
            ques:expect.objectContaining({
                text: '',
                file: null
            }),
            filename: expect.any(String),
            handleChange: expect.any(Function),
            data_test:'ques',
        });
    });
    it('should have proper props for options', () => {
        expect(findByAttr(wrapper, 'options').props()).toEqual({
            activeIndex: expect.any(Number),
            options: expect.any(Array),
            handleChange: expect.any(Function),
            removeOption: expect.any(Function),
            data_test:'options',
        });
    });
    it('should have proper props for Add Option Button', () => {
        expect(findByAttr(wrapper, 'addOptionBtn').prop('onClick')).toEqual(expect.any(Function));
        expect(findByAttr(wrapper, 'addOptionBtn').prop('type')).toEqual('button');
    });
    it('should have proper props for Submit Button', () => {
        expect(findByAttr(wrapper, 'submitBtn').prop('type')).toEqual('submit');
    });
})