import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/configuration";

export const deleteEverything = async(userId) => {
    const userDocRef = doc(db,'users', userId);
    await updateDoc(userDocRef,{
        "transactions.income": [],
        "transactions.expenses": [],
        "transactions.expense": [],
    }) 
}