import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { RobotTxtCard } from 'src/features/home';

describe('home/RobotTxtCard', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <RobotTxtCard />
    );

    expect(
      renderedComponent.find('.home-robot-txt-card').getElement()
    ).to.exist;
  });
});
