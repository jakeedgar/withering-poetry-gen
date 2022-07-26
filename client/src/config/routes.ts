import IRoute from '../interfaces/route';
import LoginPage from '../pages/Login/';
import PoemPage from '../pages/Poem';
import HomePage from '../pages/Home';

const authRoutes: IRoute[] = [
  {
    path: '/login',
    exact: true,
    auth: false,
    component: LoginPage,
    name: 'Login'
  },
  {
    path: '/register',
    exact: true,
    auth: false,
    component: LoginPage,
    name: 'Register'
  }
];

const poemRoutes: IRoute[] = [
  {
    path: '/create',
    exact: true,
    auth: false,
    component: PoemPage,
    name: 'Create'
  },
  {
    path: 'poems/update/:poemID',
    exact: true,
    auth: false,
    component: PoemPage,
    name: 'Update'
  },
  {
    path: '/poems/:poemID',
    exact: true,
    auth: false,
    component: PoemPage,
    name: 'Poem'
  }
];

const mainRoutes: IRoute[] = [
  {
    path: '/',
    exact: true,
    auth: false,
    component: HomePage,
    name: 'Home'
  }
];

const routes: IRoute[] = [...authRoutes, ...poemRoutes, ...mainRoutes];

export default routes;
