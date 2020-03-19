import App from './App'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import Register from './components/register/Register'
import Survey from './components/survey/Survey'
import QuestionsDashboard from './components/survey/QuestionsDashboard'
import Question from './components/survey/Question'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/registro',
    name: 'register',
    component: Register,
  },
  {
    path: '/cuestionario',
    name: 'questionsDashboard',
    component: QuestionsDashboard,
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
  }
  
]

export default routes
