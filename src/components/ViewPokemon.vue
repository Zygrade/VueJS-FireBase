<template>
  <div id = "view-pokemon">
  <br>
  <h3>Detailed Information</h3>
  <br>
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>

      <li class="collection-item">Pokedex ID : #{{pokemon_id}}</li>
      <li class="collection-item">Type : {{type}}</li>
      <li class="collection-item">Found in {{region}} region</li>
    </ul>
    <br>
    <br>
    <router-link to="/" class="btn blue">BACK</router-link>
    <button class="btn red" @click="deletePokemon">Delete</button>


  </div>
</template>

<script>
import db from './firebaseInit'
  export default {
    name : 'view-pokemon',
    data () {
      return {
        pokedex : null,
        name : null,
        type : null,
        region : null
      }
    },

    beforeRouteEnter(to,from,next) {
      db.collection('pokemons').where('pokedex','==',to.params.pokemon_id).get().
      then(snapshot => {
        snapshot.forEach(doc => {
          next(vm => {
            vm.pokemon_id = doc.data().pokedex
            vm.name = doc.data().name
            vm.type = doc.data().type
            vm.region = doc.data().region
          })
        })
      })
    },

    watch : {
      '$route' : 'fetchData'
    },

    methods : {
      fetchdata() {
        db.collection('pokemons').where('pokedex','==',this.$route.params.pokeon_id).get().
        then(snapshot => {
          snapshot.forEach(doc => {
              this.pokemon_id = doc.data().pokedex
              this.name = doc.data().name
              this.type = doc.data().type
              this.region = doc.data().region
            })
          })
        },

        deletePokemon () {
          if(confirm('Do you want to delete this pokemon\'s information ?')) {
            db.collection('pokemons').where('pokedex','==',this.$route.params).get().
              then(snapshot => {
                snapshot.forEach(doc => {
                  doc.ref.delete();
                  this.$router.push('/')
                  })
                })
            }
          }
      }
}
</script>
