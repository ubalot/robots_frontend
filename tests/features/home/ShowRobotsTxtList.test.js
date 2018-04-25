import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ShowRobotsTxtList } from 'src/features/home/ShowRobotsTxtList';

describe('home/ShowRobotsTxtList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ShowRobotsTxtList {...props} />
    );

    expect(
      renderedComponent.find('.home-show-robots-txt-list').getElement()
    ).to.exist;
  });
});
