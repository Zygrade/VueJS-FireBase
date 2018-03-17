import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import EditPokemon from '@/components/EditPokemon.vue'
import NewPokemon from '@/components/NewPokemon.vue'
import ViewPokemon from '@/components/ViewPokemon.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-pokemon',
      component: NewPokemon
    },
    {
      path: '/edit/:pokemon_id',
      name: 'edit-pokemon',
      component: EditPokemon
    },
    {
      path: '/view',
      name: 'view-pokemon',
      component: ViewPokemon
    }
  ]
})
