<template>
    <div>
        <v-container class="my-5">
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
            <v-layout row>
                <v-flex xs6>
                    <v-text-field 
                        label="Category"
                        type="text"
                        v-model="new_ingredient_category"
                    ></v-text-field>
                </v-flex>
            </v-layout>
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
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                new_ingredient_name: '',
                new_ingredient_category: '',
                new_ingredient_desc: ''
            }
        },
        methods: {
            add() {

                this.$store.dispatch( 'add_ingredient', {
                    name: this.new_ingredient_name, 
                    category: this.new_ingredient_category,
                    desc: this.new_ingredient_desc
                })

                this.new_ingredient_name = ''
                this.new_ingredient_category = ''
                this.new_ingredient_desc
            }
        },
        computed: {
            update_in_progress() {
                return this.$store.state.add_ingredient.in_progress
            }
        }
    }
</script>