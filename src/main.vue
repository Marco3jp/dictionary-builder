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
        <dictionary-input class="dictionary-input" :entry="creatingDictionaryEntry" @post="postData"></dictionary-input>
        <dictionary-table class="dictionary-table" :dictionaryEntries="createdDictionaryEntries"></dictionary-table>
    </div>
</template>

<script lang="ts">
    import * as firebase from "firebase/app";
    import 'firebase/firestore';
    import DictionaryTable from "@components/dictionaryTable";
    import DictionaryInput from "@components/dictionaryInput";
    import {DictionaryEntry} from "./model/dictionaryEntry";

    export default {
        name: "Main",
        components: {DictionaryTable, DictionaryInput},
        data() {
            return {
                db: undefined,
                createdDictionaryEntries: [],
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
            // this.createdDictionaryEntries = prichanDictionaryEntries;
            let test = firebase.initializeApp({
                // @ts-ignore
                apiKey: window.config.apiKey,
                // @ts-ignore
                authDomain: window.config.authDomain,
                // @ts-ignore
                projectId: window.config.projectId
            });
            this.db = firebase.firestore();
            this.getData();
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
            postData() {
                if (this.isValidatedEntry(this.creatingDictionaryEntry)) {
                    this.creatingDictionaryEntry.created_at = firebase.firestore.FieldValue.serverTimestamp();
                    this.creatingDictionaryEntry.updated_at = firebase.firestore.FieldValue.serverTimestamp();
                    this.creatingDictionaryEntry.deleted_at = 0;
                    this.db.collection("entries").add(this.creatingDictionaryEntry).then(result => {
                        console.log(result);
                    }).catch(e => {
                        console.warn(e);
                    });
                }
            },
            getData() {
                this.db.collection("entries").get().then((entries) => {
                    entries.forEach(entry => {
                        this.createdDictionaryEntries.push(entry.data());
                    })
                });
            },
            // TODO: Readingに細かなバリデーションを用意
            isValidatedEntry(entry: DictionaryEntry) {
                return typeof entry !== "undefined"
                    && typeof entry.reading !== "undefined"
                    && entry.reading !== ""
                    && typeof entry.word !== "undefined"
                    && entry.word !== ""
                    && typeof entry.created_at === "undefined"
                    && typeof entry.updated_at === "undefined"
                    && typeof entry.deleted_at === "undefined"
            }
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
