import Vue from 'vue'
// import './plugins/vuetify'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify)

import 'vuetify/dist/vuetify.min.css'

const store = new Vuex.Store({

    state: {
        lookup_in_progress: false,
        existing_ingredients: [],
        add_ingredient: {
            in_progress: false
        }
    },
    mutations: {
        set_existing_ingredients( state, ingredients ) {

            state.existing_ingredients = ingredients
        },
        set_progress_state( state, setTo ) {

            state.lookup_in_progress = setTo
        },
        change_ingredient_add_progress( state, setTo ) {

            state.add_ingredient.in_progress = setTo
        }
    },
    actions: {
        add_ingredient: async function({ commit }, newIngredientAttributes) {

            commit('change_ingredient_add_progress', true)

            try {
                let result = await axios.post( 'http://localhost:3000/ingredients/add',
                {
                    name: newIngredientAttributes.name,
                    category: newIngredientAttributes.category
                } )

                commit('change_ingredient_add_progress', false)
            } catch(e) {
                console.log( '--Caught an error' );
                console.log(e)
            }
        },
        fetch_all_ingredients: function({ commit }) {

            try {

                commit( 'set_progress_state', true )

                setTimeout(async() => {

                    let results = await axios.get( 'http://localhost:3000/ingredients/list' )

                    if( results.status !== 200 || !Array.isArray(results.data) ) {
                        throw new Error( JSON.stringify(results)  )
                    }
    
                    commit( 'set_existing_ingredients', results.data )
                    commit( 'set_progress_state', false )
                }, 2000 );


            } catch( e ) {

                console.log( '>> ERROR CAUGHT' );
                console.log( e )
            }
        }
    }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
