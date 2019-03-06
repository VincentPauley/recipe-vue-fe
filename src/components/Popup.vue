<template>
    <div data-app>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <v-card>
                <v-card-title>{{ title }}</v-card-title>
                <v-card-text>Are you sure you want to delete: {{ itemName.name }}?</v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="close_dialog(false)" class="red white--text" flat>
                        Cancel
                    </v-btn>
                    <v-btn @click="close_dialog(true)" class="blue white--text" flat>
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            itemName: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                dialog: true
            }
        },
        methods: {
            close_dialog( selection ) {

                this.$emit( 'selection', { delete: selection } )
            }
        }
    }
</script>