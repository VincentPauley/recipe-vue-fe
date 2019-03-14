<template>

  <div>
    <StatusBar/>

      <div id="ingredient-viewer">

      </div>

    <v-container>
      <v-layout row>
        <v-flex xs6>
          <AddIngredient/>        
        </v-flex>
        <v-flex xs6>
          <ActiveIngredientDisplay/>
          <ExistingIngredients/>        
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
  #ingredient-viewer{
    width: 500px;
    margin: auto;
  }
</style>

<script>
import HelloWorld from './components/HelloWorld'
import StatusBar from './components/StatusBar'
import ExistingIngredients from './components/ExistingIngredients'
import AddIngredient from './components/AddIngredient'
import ActiveIngredientDisplay from './components/ActiveIngredientDisplay'


export default {
  name: 'App',
  components: {
    HelloWorld,
    StatusBar,
    ExistingIngredients,
    AddIngredient,
    ActiveIngredientDisplay
  }
}
</script>

<style>
  * {
    font-family: 'Montserrat', sans-serif;
  }/*
  .centered-layout {
        width: 500px;
        margin: auto;
    }*/
</style>
