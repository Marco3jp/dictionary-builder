<template>
    <div class="dictionary-builder">
        <div class="flex">
            <div id="description">
                <h1>Pretty Dictionary builder</h1>
                <p>日常会話で頻繁に登場するプリティー単語ですが、これからは細かな表記に悩まされなくなります！</p>
                <p>キャラクター名、楽曲名などを登録して共有しましょう。Google日本語入力やMozcでインポート可能なファイルがダウンロードできます！</p>
            </div>
            <div id="dictionary-downloader">
                <a ref="dictionaryDownloadLink" id="dictionary-downloader-hidden-link" download="" href=""></a>
                <button id="dictionary-downloader-button" type="button" @click="download">ダウンロード</button>
            </div>
        </div>
        <dictionary-input class="dictionary-input" :entry="creatingDictionaryEntry" :error-message="errorMessage"
                          @post="postData" @clear="clearForm"></dictionary-input>
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
                errorMessage: "",
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
            this.getAllData();
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
                        this.getData(result.id).then(postData => {
                            this.createdDictionaryEntries.push(postData);
                        });
                        this.clearForm();
                    }).catch(e => {
                        this.errorMessage = e;
                    });
                }
            },
            getAllData() {
                this.db.collection("entries").get().then((entries) => {
                    entries.forEach(entry => {
                        this.createdDictionaryEntries.push(entry.data());
                    })
                });
            },
            getData(id: string): Promise<DictionaryEntry> {
                return this.db.collection("entries").doc(id).get().then(entry => {
                    return entry.data();
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
            },
            clearForm() {
                this.creatingDictionaryEntry.reading = "";
                this.creatingDictionaryEntry.word = "";
                this.creatingDictionaryEntry.category = "";
                this.creatingDictionaryEntry.comment = "";
                this.creatingDictionaryEntry.created_at = undefined;
                this.creatingDictionaryEntry.updated_at = undefined;
                this.creatingDictionaryEntry.deleted_at = undefined;
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
            width: 100%;
            margin-bottom: 30px;
        }

        .dictionary-table {
            width: 100%;
            height: 700px;
            overflow-y: auto;
        }
    }
</style>
