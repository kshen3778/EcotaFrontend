import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignOut from '@/components/SignOut'
import Return from '@/components/Return'
import Contractor from '@/components/Contractor'
import NewUser from '@/components/NewUser'
import Company from '@/components/Company'
import Profile from '@/components/Profile'
import Users from '@/components/Users'
import ManageUsers from '@/components/ManageUsers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signOut',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/return',
      name: 'Return',
      component: Return
    },
    {
      path: '/contractor',
      name: 'Contractor',
      component: Contractor
    },
    {
      path: '/newuser',
      name: 'NewUser',
      component: NewUser
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/manageUsers',
      name: 'ManageUsers',
      component: ManageUsers
    }
  ]
})
