import React , { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db, auth,firebaseC } from "../firebase";
import Canal from "../chatRepartidor/Canal";



export const Login = () => {
  
  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };

  const handleClose = () => {
    redirect("/home");
  };

  const [user,setUser] = useState(()=> auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if (user){
        setUser(user);
      }else {
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);


  const signInWithGoogle = async () => {
    
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try{
      await auth.signInWithPopup(provider);
    }catch(error){
      console.error(error);
    }

};

const signOut = async () => {
    
  try{
    await firebase.auth().signOut()
  }catch(error){
    console.error(error.message);
  }

}

if(initializing) return "Loading... ";

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          handleClose();
        }}
      >
        Ingresar al home
      </Button>

        {user ? (
          <>
          <Button onClick={signOut} variant="contained"
        color="primary">Sign out</Button>
          <p>'Bienvenidos al chat de ShipSecure'</p>
          <Canal user= {user} db = {db}/>
          </>
          ) : (
      <Button
        onClick = {signInWithGoogle}
        variant="contained"
        color="primary"
        
      >
        Ingresar al chat (por ahora solo para probarlo)
      </Button>
          )}

    </div>
  );
};
export default Login;
