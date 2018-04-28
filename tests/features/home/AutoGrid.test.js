import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AutoGrid } from 'src/features/home';

describe('home/AutoGrid', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <AutoGrid />
    );

    expect(
      renderedComponent.find('.home-auto-grid').getElement()
    ).to.exist;
  });
});
