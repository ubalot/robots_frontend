import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ShowRobotTxts } from 'src/features/home/ShowRobotTxts';

describe('home/ShowRobotTxts', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ShowRobotTxts {...props} />
    );

    expect(
      renderedComponent.find('.home-show-robot-txts').getElement()
    ).to.exist;
  });
});
