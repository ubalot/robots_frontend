// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  ReadRobotsTxt,
  RobotsTxtForm,
  ShowRobotsTxtList,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    // { path: 'test-page', name: 'Test page', component: TestPage },
    { path: 'read-robots-txt',
      name: 'Quick view robots.txt',
      component: ReadRobotsTxt,
      // isIndex: true
    },
    { path: 'robotstxt-form',
      name: 'Add robots.txt to db',
      component: RobotsTxtForm
    },
    { path: 'robottxts', name: 'Show robots txt list', component: ShowRobotsTxtList },
  ],
};
