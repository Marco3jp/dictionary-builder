<template>
    <div class="dictionary-table">
        <div class="dictionary-table-header">
            <div class="dictionary-table-header-reading">
                reading
            </div>
            <div class="dictionary-table-header-word">
                word
            </div>
            <div class="dictionary-table-header-category">
                category
            </div>
            <div class="dictionary-table-header-created">
                created
            </div>
            <div class="dictionary-table-header-updated">
                updated
            </div>
        </div>
        <dictionary-row class="dictionary-row" v-for="(entry, index) in dictionaryEntries" :entry="entry"
                        :key="index"></dictionary-row>
    </div>
</template>

<script lang="ts">
    import DictionaryRow from "@components/dictionaryRow"

    export default {
        name: "dictionaryTable",
        components: {DictionaryRow},
        props: ["dictionaryEntries"],
    }
</script>

<style scoped lang="scss">
    @import "../_values.scss";

    .dictionary-table-header {
        display: flex;
        width: 100%;

        & > div {
            text-align: center;
            width: $table-cell-width;
        }
    }

    .dictionary-row {
        height: 30px;
        margin-bottom: 15px;
    }
</style>
