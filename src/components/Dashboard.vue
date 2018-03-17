<template>
  <div id = "dashboard">
    <h4>Pokemons seen</h4>
     <ul class="collection">

      <li class="collection-item" v-for="pokemon in pokemons" v-bind:key="pokemon.id">
        <div class="chip"> {{pokemon.pokemon_id}} </div>           {{ pokemon.name }}                <div class="chip"> {{pokemon.type}} </div>
      </li>
    </ul>


      <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large red">
          <i class="fa fa-plus"></i>
        </router-link>
      </div>
  </div>
</template>

<script>
import db from './firebaseInit'
  export default {
    name : 'dashboard',
    data () {
      return {
        pokemons : []
      }
    },

    created() {
      db.collection('pokemons').orderBy('pokedex').get().then(snapshot => {
          snapshot.forEach(doc => {

              const data = {
                  'id' : doc.id,
                  'pokemon_id' : doc.data().pokedex,
                  'name' : doc.data().name,
                  'region' : doc.data().region,
                  'type' : doc.data().type
              }

              this.pokemons.push(data);
          })

      })
    }
  }
</script>
