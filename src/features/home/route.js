// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  TestPage,
  ReadRobotsTxt,
  RobotsTxtForm,
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
    { path: 'test-page', name: 'Test page', component: TestPage },
    { path: 'read-robots-txt', name: 'Read robots txt', component: ReadRobotsTxt },
    { path: 'robotstxt-form', name: 'Robots txt form', component: RobotsTxtForm },
  ],
};
