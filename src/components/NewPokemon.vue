<template>
  <div id = "new-pokemon">
    <h3>New Pokemon</h3>

      <div class="row">
        <form @submit.prevent="addPokemon" class="col s12">

          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="pokedex" required>
                <label>Pokedex Number #</label>
            </div>
           </div>

           <div class="row">
             <div class="input-field col s12">
               <input type="text" v-model="name" required>
                 <label>Name</label>
             </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input type="text" v-model="type" required>
                  <label>Type</label>
              </div>
             </div>

             <div class="row">
               <div class="input-field col s12">
                 <input type="text" v-model="region" required>
                   <label>Region</label>
               </div>
              </div>

            <button type="submit" value="submit" class="btn green">Submit</button>
            <router-link to="/" class="btn red">BACK</router-link>

        </form>
  </div>
</div>
</template>

<script>
import db from './firebaseInit'
  export default {
    name : 'new-pokemon',
    data () {
      return {
          pokedex : null,
          name : null,
          type : null,
          region : null
      }
    },

    methods : {
      addPokemon () {
        db.collection('pokemons').add({
          pokedex : this.pokedex,
          name : this.name,
          type : this.type,
          region : this.region
        })
        .then(docRef => {
          console.log('New Pokemon added to db with ID: ', docRef.id);
          this.$router.push('/')
        })
        .catch(error => {
          console.log('Error adding new Pokemon : ',error);
        })
      }
    }
  }
</script>
