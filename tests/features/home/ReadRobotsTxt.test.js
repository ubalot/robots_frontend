import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ReadRobotsTxt } from 'src/features/home/ReadRobotsTxt';

describe('home/ReadRobotsTxt', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ReadRobotsTxt {...props} />
    );

    expect(
      renderedComponent.find('.home-read-robots-txt').getElement()
    ).to.exist;
  });
});
