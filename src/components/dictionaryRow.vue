<template>
    <v-form class="dictionary-row">
        <v-container fluid>
            <v-row>
                <v-col cols="3">
                    <v-text-field type="text" class="dictionary-row-reading-input" v-model="entry.reading"
                                  :readonly="!editable" :required="editable" :rules="textFieldRule"
                                  label="reading"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field type="text" class="dictionary-row-word-input" v-model="entry.word"
                                  :readonly="!editable" :required="editable" :rules="textFieldRule"
                                  label="word"></v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-text-field type="text" class="dictionary-row-category-input" v-model="entry.category"
                                  :readonly="!editable" :required="editable" :rules="textFieldRule"
                                  label="category"></v-text-field>
                </v-col>
                <v-col cols="2">
                    <div class="dictionary-row-created" v-if="!editable">
                        {{(new Date(entry.created_at.seconds*1000)).toISOString()}}
                    </div>
                </v-col>
                <v-col cols="2">
                    <div class="dictionary-row-updated" v-if="!editable">
                        {{(new Date(entry.updated_at.seconds*1000)).toISOString()}}
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script lang="ts">
    export default {
        name: "dictionaryRow",
        props: ["entry", "editable"],
        data: function () {
            return {
                textFieldRule: [v => !!v || 'Required'],
            }
        }
    }
</script>

<style scoped lang="scss">
    .dictionary-row {
        width: 100%;
        height: 100%;

        & > div {
            &.dictionary-row-created, &.dictionary-row-updated {
                text-align: center;
            }
        }
    }
</style>
