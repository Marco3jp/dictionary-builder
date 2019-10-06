<template>
    <v-form class="dictionary-input">
        <dictionary-row class="dictionary-row" :editable="true" :entry="entry"></dictionary-row>
        <div class="dictionary-input-tools">
            <p v-if="errorMessage !== ''" class="dictionary-input-tools-error">{{}}</p>
            <button type="button" @click="$emit('clear')">クリア</button>
            <button type="button" @click="$emit('post')">登録</button>
        </div>
    </div>
</template>

<script lang="ts">
    import DictionaryRow from "@components/dictionaryRow";
    import Vue from "vue";

    export default {
        name: "dictionaryInput",
        components: {DictionaryRow},
        props: ["entry", "errorMessage"],
    }
</script>

<style scoped lang="scss">
    @import "../_values.scss";

    .dictionary-input {
        .dictionary-input-header {
            display: flex;

            & > div {
                width: $table-cell-width;
                text-align: center;
            }

            .dictionary-table-header-category {
                cursor: help;
            }
        }

        .dictionary-row {
            height: 30px;
            margin-bottom: 15px;
        }

        .dictionary-input-tools {
            display: flex;
            height: 30px;

            & > button {
                margin-right: 30px;

                &:first-of-type {
                    margin-left: auto;
                }
            }
        }
    }
</style>
