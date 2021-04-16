import { expect } from 'chai';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import BandInput from '../src/components/BandInput';
import sinon from 'sinon';
import { renderer } from '../src/index';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import manageBand from '../src/reducers/manageBand';
import Band from '../src/components/Band'
import App from '../src/App';
import BandsContainer from '../src/components/BandsContainer';

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('Bands Component', () => {
  it('displays bands from Redux store', () => {
    const store = createStore(manageBand)
    sinon.stub(store, 'getState').returns({
      bands: [
        { id: 1, text: 'The Legendary Pink Dots' },
        { id: 2, text: 'The Castanets' },
        { id: 3, text: 'Cool Runnings' }
      ]
    });

    const wrapper = mount(<Provider store={store}><App /></Provider>)
    expect(wrapper.find('li')).to.have.length(3);
  });
});

describe('Band Component', () => {

  it('renders an li', () => {
    const band = { id: 1, name: 'Momus' };
    const wrapper = shallow(<Band band={band} />);
    expect(wrapper.find('li')).to.have.length(1);
  });
});

describe('Band Component with Redux', () => {

  it('has a button that dispatches an DELETE_BAND action', ()=> {
    const store = createStore(manageBand);
    store.dispatch({type: 'ADD_BAND', name: 'Daft Punk'})

    const wrapper = mount(<Provider store={store}><App /></Provider>);

    let deleteButton = wrapper.find('button').first();

    expect(store.getState().bands.length).to.equal(1)
    deleteButton.simulate('click',  { preventDefault() {} });
    expect(store.getState().bands.length).to.equal(0)

  });
});
