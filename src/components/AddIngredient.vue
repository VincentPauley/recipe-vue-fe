<template>
    <div>

        <div v-if="update_in_progress">
            <h3>Saving new ingredient</h3>
        </div>

        <h4>Add Ingredient:</h4>
        <v-layout>
            <v-flex
                xs12
                sm4
                md4
            >
                <v-text-field 
                    label="Ingredient Name"
                    type="text"
                    v-model="new_ingredient_name"
                ></v-text-field>
            </v-flex
                xs12
                sm4
                md4
            >
                <v-text-field 
                    label="Category"
                    type="text"
                    v-model="new_ingredient_category"
                ></v-text-field>
            <v-flex>
            
            </v-flex>

            <v-flex
                xs12
                sm4
                md4
            >
                <v-btn  @click="add" class="blue white--text">
                    <v-icon>add</v-icon>
                </v-btn>    
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                new_ingredient_name: '',
                new_ingredient_category: ''
            }
        },
        methods: {
            add() {

                this.$store.dispatch( 'add_ingredient', {
                    name: this.new_ingredient_name, 
                    category: this.new_ingredient_category
                })

                this.new_ingredient_name = ''
                this.new_ingredient_category = ''
            }
        },
        computed: {
            update_in_progress() {
                return this.$store.state.add_ingredient.in_progress
            }
        }
    }
</script>