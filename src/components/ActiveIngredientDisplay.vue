<template>
    <v-card id="active-ingredient-display">
        <i v-if="!loadingIngredient && !selectedObj">Select an Ingredient below to view more details</i>

        <div v-if="loadingIngredient">
            <p>Loading...</p>
        </div>

        <div v-if="!loadingIngredient && selectedObj">        
            <h3>{{ selectedObj.name }} <small>{{ selectedObj.category }}</small></h3>

            <div id="item-description" v-if="selectedObj.description">
                <p>{{ selectedObj.description }}</p>
            </div>
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
    h3 > small {
        color: #adadad;
        font-size: 17px;
    }
    #active-ingredient-display #item-description {
        padding-top: 10px;
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