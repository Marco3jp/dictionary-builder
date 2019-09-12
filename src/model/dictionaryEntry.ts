import * as firebase from "firebase/app";
import 'firebase/firestore';

export interface DictionaryEntry {
    reading?: string,
    word?: string,
    category?: string,
    comment?: string,
    created_at?: firebase.firestore.FieldValue,
    updated_at?: firebase.firestore.FieldValue,
    deleted_at?: firebase.firestore.FieldValue,
}
