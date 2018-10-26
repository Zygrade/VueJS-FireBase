<template>
  <div id="new-pokemon">
    <h3>Edit Pokemon</h3>
    <div class="row">
    <form @submit.prevent="updatePokemon" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="pokemon_id" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="type" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="region" required>
        </div>
      </div>
      <button type="submit" class="btn green">Submit</button>
      <router-link to="/" class="btn red">BACK</router-link>
    </form>
  </div>
  </div>
</template>


<script>
import db from './firebaseInit'
  export default {
    name : 'edit-pokemon',
    data () {
      return {
        pokemon_id : null,
        name : null,
        type : null,
        region : null
      }
    },

    beforeRouteEnter (to,from,next) {
      db.collection('pokemons').where('pokedex','==',to.params.pokemon_id).get()
      .then(snapshot => {
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
      fetchData () {
        db.collection('pokemons').where('pokedex','==',this.$route.params.pokemon_id).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.pokemon_id = doc.data().pokedex,
            this.name = doc.data().name
            this.type = doc.data().Type
            this.region = doc.data().region
          })
        })
      },

      updatePokemon() {
        db.collection('pokemons').where('pokedex','==',this.$route.params.pokemon_id).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.update({
              pokedex : this.pokemon_id,
              name : this.name,
              type : this.type,
              region : this.region
            })
          })
        })
        .then( () => {
          this.$router.push({name : 'view-pokemon', params : {pokemon_id : this.pokemon_id}})
        });
      }
    }
  }
</script>
