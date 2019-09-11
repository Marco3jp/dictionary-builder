<template>
    <div class="dictionary-builder">
        <h1>Dictionary builder</h1>
        <p>Google日本語入力やMozcで使える辞書を作って共有しよう！</p>
        <dictionary-input class="dictionary-input" :entry="creatingDictionaryEntry"></dictionary-input>
        <dictionary-table class="dictionary-table" :dictionaryEntries="createdDictionaryEntries"></dictionary-table>
    </div>
</template>

<script lang="ts">
    import DictionaryTable from "@components/dictionaryTable";
    import DictionaryInput from "@components/dictionaryInput";
    import {prichanDictionaryEntries} from "./sample/prichanDictionaryEntries";

    export default {
        name: "Main",
        components: {DictionaryTable, DictionaryInput},
        data() {
            return {
                db: undefined,
                createdDictionaryEntries: undefined,
                creatingDictionaryEntry: {
                    reading: "",
                    word: "",
                    category: "",
                    comment: "",
                    created_at: undefined,
                    updated_at: undefined,
                    deleted_at: undefined,
                },
            }
        },
        mounted: function () {
            this.createdDictionaryEntries = prichanDictionaryEntries;
        }
    }
</script>
<style lang="scss">
    @import "../node_modules/normalize.css/normalize.css";

    * {
        box-sizing: border-box;
    }
</style>
<style scoped lang="scss">
    .dictionary-builder {
        width: 1400px;
        margin: 80px auto;

        .dictionary-input {
            height: 90px;
            width: 100%;
        }

        .dictionary-table {
            width: 100%;
            height: 700px;
            overflow-y: auto;
        }
    }
</style>
