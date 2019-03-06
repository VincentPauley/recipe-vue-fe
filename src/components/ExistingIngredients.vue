<template>
    <div>
        
        <div v-if="in_progress">
            <h4>Loading...</h4>
        </div>
        
        <v-list>
            <h3>All Ingredients {{ delete_in_progress }}</h3>

            <!-- TODO: Break this out into it's own component... too much logic in here -->
            <v-list-tile class="ingredient-list-item" v-for="ingredient in existing_ingredients" :key="ingredient._id">

                <v-btn 
                    @click="full_details_request(ingredient._id)"
                    flat
                    class="white"
                >{{ ingredient.name }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat class="blue--text">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn flat class="red--text" @click="delete_request(ingredient)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-list-tile>
        </v-list>

        <Popup v-if="toDelete" v-on:selection="perform_delete" :title="'Confirm Delete'" :itemName="toDelete"/>
    </div>
</template>

<style>
    .ingredient-list-item {
        border-bottom: 1px solid #E4E4E4;
    }
</style>

<script>

    import Popup from './Popup'

    export default {
        data() {
            return {
                toDelete: null
            }
        },
        components: {
            Popup
        },
        methods: {
            full_details_request( itemID ) {
                this.$store.dispatch( 'inspect_full_ingredient', itemID )
            },
            delete_request( itemObj ) {

                this.toDelete = itemObj
            },
            perform_delete( args ) {

                if( args.delete ) {
                    this.$store.dispatch('delete_ingredient', this.toDelete._id )
                }
                this.toDelete = null
            }
        },
        computed: {
            existing_ingredients() {
                return this.$store.state.existing_ingredients
            },
            in_progress() {
                return this.$store.state.lookup_in_progress
            },
            delete_in_progress() {
                return this.$store.state.delete_ingredient.in_progress
            }
        },
        created() {

            this.$store.dispatch('fetch_all_ingredients')            
        }
    }
</script>