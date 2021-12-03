import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import PatientAdd from './components/views/PatientAdd'
import PushData from './components/views/PushData'
import pushedData from './components/views/pushedData'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment', requiresAuth: true}
      }, {
        path: 'patient/add',
        component: PatientAdd,
        name: 'Add patient',
        meta: {description: 'Add patient', requiresAuth: true}
      }, {
        path: 'push/data',
        component: PushData,
        name: 'Push Data',
        meta: {description: 'Push Data', requiresAuth: true}
      }, {
        path: 'data',
        component: pushedData,
        name: 'Data',
        meta: {description: 'Data', requiresAuth: true}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
