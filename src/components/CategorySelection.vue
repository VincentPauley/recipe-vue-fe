<template>
    <v-autocomplete
        v-model="model"
        :items="knownCategories"
        :label="'Category'"
        persistent-hint
        @blur="updateCategory"
    >
        <template v-slot:append-outer>
            <v-slide-x-reverse-transition
                mode="out-in"
            >
            </v-slide-x-reverse-transition>
        </template>
    </v-autocomplete>
</template>

<script>
    export default {
        data () {
            return {
                isEditing: true,
                model: null
            }
        },
        methods: {
            updateCategory() {
                this.$emit( 'categorySelection', this.model )
            }
        },
        computed: {
            knownCategories() {
                return this.$store.state.distinct_categories
            }
        },
        created() {

            this.$store.dispatch('get_known_categories')
        }
    }
</script>