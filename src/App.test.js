import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { MainApp } from './App.js';

describe('App.js file test', () => {
  let wrapper;

  describe('MainApp Component', () => {
    beforeEach(() => {
      wrapper = shallow(<MainApp />)
    });

    it('should contain the h3 text', () => {
      expect(wrapper.text()).to.contain('Get the exchange rate of any currency in USD');
    });
    
    it('should contain a class container', () => {
      expect(wrapper.find('.container')).to.have.length(1);
    });
  });
})
