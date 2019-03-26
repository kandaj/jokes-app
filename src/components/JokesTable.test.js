import React from 'react'
import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import JokesTable from './JokesTable'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
configure({adapter: new Adapter()});

describe('<JokesTable />', () => {
    it('should render no table', () => {
        const wrapper = shallow(<JokesTable />);
        expect(wrapper.find(BootstrapTable)).toHaveLength(0);
    });

    it('with state should render table', () => {
        const wrapper = shallow(<JokesTable />);
        wrapper.setState( {
            loading: false, jokes: [{id:1,joke:'test'}], msg: null }
        )
        expect(wrapper.find(BootstrapTable)).toHaveLength(1);
    });
})

