<template>
    <v-card id="active-ingredient-display">
        <i v-if="!loadingIngredient && !selectedObj">Select an Ingredient below to view more details</i>

        <div v-if="loadingIngredient">
            <p>Loading...</p>
        </div>

        <div v-if="!loadingIngredient && selectedObj">        
            <h3>{{ selectedObj.name }}</h3>
            <i>{{ selectedObj.category }}</i>
        </div>
                
    </v-card>
</template>

<style>
    #active-ingredient-display {
        padding: 12px;
        min-height: 130px;
    }
    #active-ingredient-display h3 {
        color: #444444;
        font-size: 30px;
    }
    #active-ingredient-display i {
        color: #616161;
    }
</style>

<script>
    export default {
        computed: {
            selectedObj() {
                return this.$store.state.active_ingredient.content
            },
            loadingIngredient() {
                return this.$store.state.active_ingredient.is_loading
            }
        }
    }
</script>