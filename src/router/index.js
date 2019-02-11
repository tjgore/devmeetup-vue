import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateMeetups from '@/components/Meetup/CreateMeetups'
import Meetups from '@/components/Meetup/Meetups'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Meetup from '@/components/Meetup/Meetup'
import AuthGuard from '@/router/auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'createmeetup',
      component: CreateMeetups,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetup/:id',
      name: 'meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }

  ],
  mode: 'history'
})
