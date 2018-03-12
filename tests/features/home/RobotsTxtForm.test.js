import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { RobotsTxtForm } from 'src/features/home/RobotsTxtForm';

describe('home/RobotsTxtForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RobotsTxtForm {...props} />
    );

    expect(
      renderedComponent.find('.home-robots-txt-form').getElement()
    ).to.exist;
  });
});
