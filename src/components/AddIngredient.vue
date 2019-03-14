<template>
    <div>
        <v-card id="ingredient-add-form">
            <v-layout row>
                <v-flex xs6>
                    <h4>Add Ingredient:</h4>
                    <v-text-field 
                        label="Name"
                        type="text"
                        v-model="new_ingredient_name"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex xs12>
                    <CategorySelection v-on:categorySelection="setCategory"/>
                </v-flex>
            </v-layout>

            <!--
            <v-layout row>
                <v-flex xs6>
                    <v-text-field 
                        label="Category"
                        type="text"
                        v-model="new_ingredient_category"
                    ></v-text-field>
                    <p>{{ distinct_categories }}</p>
                </v-flex>
            </v-layout>
            -->

            <v-layout row>
                <v-flex xs12>
                    <v-textarea label="Description" v-model="new_ingredient_desc"></v-textarea>
                </v-flex>            
            </v-layout>
            <v-layout row>
                <v-btn  @click="add" class="blue white--text">
                    <v-icon>add</v-icon>
                </v-btn> 
            </v-layout>
            <div v-if="update_in_progress">
                <h3>Saving new ingredient</h3>
            </div>
        </v-card>
    </div>
</template>

<style>
    #ingredient-add-form {
        padding: 10px;
    }
</style>

<script>

    import CategorySelection from './CategorySelection'

    export default {
        data() {
            return {
                new_ingredient_name: '',
                new_ingredient_category: '',
                new_ingredient_desc: ''
            }
        },
        components: { CategorySelection },
        methods: {
            setCategory( categoryChoice ) {

                this.new_ingredient_category = categoryChoice
            },
            add() {

                this.$store.dispatch( 'add_ingredient', {
                    name: this.new_ingredient_name, 
                    category: this.new_ingredient_category,
                    desc: this.new_ingredient_desc
                })

                this.new_ingredient_name = ''
                this.new_ingredient_category = ''
                this.new_ingredient_desc = ''
            }
        },
        computed: {
            update_in_progress() {
                return this.$store.state.add_ingredient.in_progress
            }
        }
    }
</script>