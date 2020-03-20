import App from './App'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import Register from './components/register/Register'
import Survey from './components/survey/Survey'
import QuestionsDashboard from './components/survey/QuestionsDashboard'
import Question from './components/survey/Question'
import Finished from './components/home/Finished'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/registro',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/cuestionario',
    name: 'questionsDashboard',
    component: QuestionsDashboard,
    meta: {
      requiresData: true,
    }
    // children: [
    //     {
    //         path: '/',
    //         component: QuestionsDashboard
    //     },
    //     {
    //         path: ':id',
    //         component: Question
    //     }
    // ]
  },
  {
    path: '/cuestionario/:id',
    name: 'surveyQuestion',
    component: Question,
    meta: {
      requiresData: true,
    }
  },
  {
    path: '/finalizado',
    name: 'finished',
    component: Finished,
    meta: {
      requiresAuth: true,
    }
  }
  
]

export default routes
