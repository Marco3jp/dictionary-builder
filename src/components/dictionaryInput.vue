<template>
    <div class="dictionary-input">
        <dictionary-row class="dictionary-row" :editable="true" :entry="entry"></dictionary-row>
        <div class="dictionary-input-tools">
            <button type="button" @click="$emit('clear')">クリア</button>
            <button type="button" @click="$emit('post')">送信</button>
        </div>
    </div>
</template>

<script lang="ts">
    import DictionaryRow from "@components/dictionaryRow";
    import Vue from "vue";

    export default {
        name: "dictionaryInput",
        components: {DictionaryRow},
        props: ["entry"],
    }
</script>

<style scoped lang="scss">
    .dictionary-input {
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
