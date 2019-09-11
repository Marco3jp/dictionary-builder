<template>
    <div class="dictionary-row">
        <div class="dictionary-row-reading">
            <input type="text" class="dictionary-row-reading-input" v-model="entry.reading"
                   :readonly="!editable">
        </div>
        <div class="dictionary-row-word">
            <input type="text" class="dictionary-row-word-input" v-model="entry.word"
                   :readonly="!editable">
        </div>
        <div class="dictionary-row-category">
            <input type="text" class="dictionary-row-category-input" v-model="entry.category"
                   :readonly="!editable">
        </div>
        <div class="dictionary-row-created">
            <input type="text" class="dictionary-row-created-input" v-model="entry.created"
                   :readonly="!editable">
        </div>
        <div class="dictionary-row-updated">
            <input type="text" class="dictionary-row-updated-input" v-model="entry.updated"
                   :readonly="!editable">
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "dictionaryRow",
        props: ["entry", "editable"]
    }
</script>

<style scoped lang="scss">
    @import "../_values.scss";

    .dictionary-row {
        width: 100%;
        height: 100%;
        display: flex;

        & > div {
            width: $table-cell-width;

            & > input {
                width: 80%;
                height: 100%;
                margin: 0 10%;
            }

        }
    }
</style>
