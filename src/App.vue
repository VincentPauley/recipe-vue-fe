<template>

  <!-- 
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
  -->
  <div>
    <StatusBar/>
    <AddIngredient/>
      <div id="ingredient-viewer">
        <ActiveIngredientDisplay/>
        <ExistingIngredients/>
      </div>
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
