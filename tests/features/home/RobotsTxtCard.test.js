import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { RobotsTxtCard } from 'src/features/home';

describe('home/RobotsTxtCard', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <RobotsTxtCard />
    );

    expect(
      renderedComponent.find('.home-robots-txt-card').getElement()
    ).to.exist;
  });
});
