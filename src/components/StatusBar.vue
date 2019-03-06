<template>
    <div id="status-bar">
        <h3>{{ current_status }}</h3>
    </div>
</template>

<script>
    export default {
        computed: {

            current_status() {
                return this.$store.state.global_status
            }
        }
    }
</script>

<style>
    #status-bar {
        background-color: black;
        padding: 15px;
        min-width: 60px;
    }
    #status-bar h3 {
        color: #FEFEFE;
    }
</style>