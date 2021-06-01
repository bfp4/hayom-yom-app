import { firestore } from "../firebaseConfig.js"

export default function useAddFirestore(data){
    const message = data.message
    const name = data.name == "" ? "Anonymous" : data.name

    firestore.collection("issues").add({
        message: message,
        name: name
    })
}