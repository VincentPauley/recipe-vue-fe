<template>
    <div>
        
        <div v-if="in_progress">
            <h4>Loading...</h4>
        </div>
        
        <v-list id="existing-ingredient-list">
            <h3>All Ingredients</h3>
            <v-list-tile class="ingredient-list-item" v-for="ingredient in existing_ingredients" :key="ingredient._id">{{ ingredient.name }}</v-list-tile>
        </v-list>

    </div>
</template>

<style>
    #existing-ingredient-list {
        width: 400px;
        margin: auto;
    }
    .ingredient-list-item {
        border-bottom: 1px solid #E4E4E4;
    }

</style>

<script>
    export default {
        methods: {
        },
        computed: {
            existing_ingredients() {
                return this.$store.state.existing_ingredients
            },
            in_progress() {
                return this.$store.state.lookup_in_progress
            }
        },
        created() {

            this.$store.dispatch('fetch_all_ingredients')            
        }
    }
</script>