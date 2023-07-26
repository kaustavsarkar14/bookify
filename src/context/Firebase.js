import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth'
import { addDoc, collection, getFirestore, getDocs, getDoc, doc, query, where } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const FirebaseContext = createContext(null)
const firebaseConfig = {
    apiKey: "AIzaSyCvLFaTDpqfabFGTVGu4fRoKfnJi0TVwJ8",
    authDomain: "bookify-c9fa8.firebaseapp.com",
    projectId: "bookify-c9fa8",
    storageBucket: "bookify-c9fa8.appspot.com",
    messagingSenderId: "1092636404080",
    appId: "1:1092636404080:web:2bec3815b4f1f8ff3287b5"
};
export const useFirebase = () => useContext(FirebaseContext)
const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
const googleProvider = new GoogleAuthProvider()

export const FirebaseProvider = (props) => {
    const[user, setUser] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user)=>{
            if(user) setUser(user)
            else setUser(null)
        })
    },[])
    const signupUserWithEmailAndPassword = (email, password)=>createUserWithEmailAndPassword(firebaseAuth, email, password)
    const signinUserWithEmailAndPassword = (email, password)=>signInWithEmailAndPassword(firebaseAuth, email, password)
    const signinWithGoogle =()=> signInWithPopup(firebaseAuth, googleProvider).then(user=>console.log(user))

    const handleCreateNewListing = async (name, isbn, price, cover)=>{
        const imageRef = ref(storage, `uploads/images/${Date.now()}${cover.name}`)
        const uploadResult = await uploadBytes(imageRef, cover)
        return await addDoc(collection(firestore,'books'),{
            name, 
            isbn,
            price,
            imageUrl : uploadResult.ref.fullPath,
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL
        })
    }
    const listAllBooks = ()=>{
        return getDocs(collection(firestore, "books"))
    }
    const getBookByID = async(id)=>{
        const docRef = doc(firestore, 'books', id)
        const result = await getDoc(docRef)
        return result
    }
    const getImgURL = (path)=>{
        return getDownloadURL(ref(storage, path))
    }
    const placeOrder =async  (bookId, qty)=>{
         const collectionRef = collection(firestore, "books", bookId, "orders")
        const result = await addDoc(collectionRef,{
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL,
            qty
        })
        return result
    }
    const fetchMyBooks=async(userId)=>{
        const collectionRef = collection(firestore, "books")
        const q = query(collectionRef, where("userID","==", userId))
        const result =await getDocs(q)
        return result
    }
    const getOrders = async (id)=>{
        const collectionRef = collection(firestore, "books", id, "orders")
        const result = await getDocs(collectionRef)
        return result
    }
    const isLoggedIn = user ? true : false
    return <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, signinWithGoogle,handleCreateNewListing, listAllBooks, getImgURL,getBookByID,placeOrder,fetchMyBooks,getOrders,isLoggedIn, user}} >
        {props.children}
    </FirebaseContext.Provider>
}