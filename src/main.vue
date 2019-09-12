<template>
    <div class="dictionary-builder">
        <div class="flex">
            <div id="description">
                <h1>Dictionary builder</h1>
                <p>Google日本語入力やMozcで使える辞書を作って共有しよう！</p>
            </div>
            <div id="dictionary-downloader">
                <a ref="dictionaryDownloadLink" id="dictionary-downloader-hidden-link" download="" href=""></a>
                <button id="dictionary-downloader-button" type="button" @click="download">ダウンロード</button>
            </div>
        </div>
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
        },
        methods: {
            download() {
                let dictionaryString = "";
                this.createdDictionaryEntries.forEach(entry => {
                    dictionaryString += `${entry.reading}\t${entry.word}\t${entry.category}\t${entry.comment}\n`
                });
                this.$refs.dictionaryDownloadLink.href = URL.createObjectURL(new Blob([dictionaryString], {"type": "text/plain"}));
                // @ts-ignore
                this.$refs.dictionaryDownloadLink.download = `${window.config.dictionaryBaseName}_${(new Date(Date.now())).toISOString()}.txt`;
                this.$refs.dictionaryDownloadLink.click();
            },
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
    .flex {
        display: flex;

        #description {
            flex-grow: 1;
        }

        #dictionary-downloader {
            #dictionary-downloader-hidden-link {
                display: none;
            }
        }
    }

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
