import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ViewEmployee from '@/components/ViewEmployee'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta : {
        requiresGuest : true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta : {
        requiresGuest : true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta : {
        requiresAuth : true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta : {
        requiresAuth : true
      }
    }
  ]
});

// Nav Guards / Protected Routes 
router.beforeEach((to,from,next) => {
  // Verifying requiresAuth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Not logged in
    if(!firebase.auth().currentUser) {
      next({
        path : '/login',
        query : { redirect : to.fullPath }
      });
    } else {
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Not logged in
    if(firebase.auth().currentUser) { 
      next({
        path : '/',
        query : { redirect : to.fullPath }
      });
    } else {
      next();
    }
  }
  else {
    next();
  }
});

export default router;