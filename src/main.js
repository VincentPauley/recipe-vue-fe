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

const BASE_URL = 'http://localhost:3000'

const store = new Vuex.Store({

    state: {
        global_status: '',
        lookup_in_progress: false,
        existing_ingredients: [],
        add_ingredient: {
            in_progress: false
        },
        delete_ingredient: {
            in_progress: false
        },
        active_ingredient: { 
            is_loading: false,
            content: null
        }
    },
    mutations: {
        active_ingredient_loading( state ) {

            state.active_ingredient.is_loading = !state.active_ingredient.is_loading
        },
        set_active_ingredient( state, ingredientObj ) {

            state.active_ingredient.content = ingredientObj
        },
        set_existing_ingredients( state, ingredients ) {

            state.existing_ingredients = ingredients
        },
        set_progress_state( state, setTo ) {

            state.lookup_in_progress = setTo
        },
        change_ingredient_add_progress( state, setTo ) {

            state.add_ingredient.in_progress = setTo
        },
        change_ingredient_delete_progress( state, setTo ) {

            state.delete_ingredient.in_progress = setTo
        },
        prepend_local_ingredients_list( state, newIngredient ) {

            state.existing_ingredients = [ newIngredient, ...state.existing_ingredients ]
        },
        update_local_ingredients_list( state, ingredientID ) {

            let edited_list = state.existing_ingredients.filter( ingredient => {

                return ingredient._id !== ingredientID;
            })

            state.existing_ingredients = edited_list
        }
    },
    actions: {
        inspect_full_ingredient: async function({ commit }, ingredientID ) {

            commit('active_ingredient_loading')

            try {
                // TODO: this route should be fixed to be: "/ingredient/234i234jahfasdf090j90j"
                const ingredient = await axios.get( `${ BASE_URL }/ingredients/id/${ ingredientID }` )
            
                if( ingredient.status !== 200 || typeof ingredient.data !== 'object' ) {

                    throw new Error( ingredient )
                }
                
                commit('set_active_ingredient', ingredient.data)

            } catch( e ) {
                console.log( '--Caught an error: ingredient full details' );
                console.log(e)
            } finally {

                commit('active_ingredient_loading')
            }
        },
        add_ingredient: async function({ commit }, newIngredientAttributes) {

            commit('change_ingredient_add_progress', true)

            try {
                let result = await axios.post( 'http://localhost:3000/ingredients/add',
                {
                    name: newIngredientAttributes.name,
                    category: newIngredientAttributes.category,
                    description: newIngredientAttributes.desc,
                    created_by: 'vpauley', // < its just me for now :)
                    last_modified_by: 'vpauley'
                })

                if( result.status !== 200 || typeof result.data !== 'object' ) {
                    throw new Error( JSON.stringify(result) )
                }

                commit('prepend_local_ingredients_list', {name:newIngredientAttributes.name, _id: result.data.id})

                commit('change_ingredient_add_progress', false)
            } catch(e) {
                console.log( '--Caught an error' );
                console.log(e)
            }
        },
        delete_ingredient: async function({ commit }, ingredientID ) {

            commit('change_ingredient_delete_progress', true)

            try {

                let result = await axios.delete( 'http://localhost:3000/ingredients/' + ingredientID )

                commit('update_local_ingredients_list', ingredientID)
                commit('change_ingredient_delete_progress', false)

            } catch(e) {

                console.log( '-- caught error in delete req' );
                console.log(e);
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
