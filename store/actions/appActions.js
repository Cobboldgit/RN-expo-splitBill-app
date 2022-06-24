import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/firebase";
import firebase from "../../firebase/firebase";

// ==============================================
// =              wait for refresh             =
//==============================================

export const wait = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
};

// ==============================================
// =              dark mode                     =
//==============================================

export const setDarkMode = (state) => {
  return {
    type: "DARK_MODE",
    payload: state,
  };
};

// ==============================================
// =              show modal                   =
//==============================================
export const setShowModal = (state) => {
  return {
    type: "SET_SHOW_MODAL",
    payload: state,
  };
};

export const setSelectedImage = (url) => {
  console.log("url", url);
  return {
    type: "SET_SHOW_MODAL",
    payload: url,
  };
};

// ==============================================
// =              random id generator           =
//==============================================

export const randId = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// ==============================================
// =              image picker                  =
//==============================================
export const pickImage = async (type) => {
  if (type === "camera") {
    let result = ImagePicker.launchCameraAsync();
    return result;
  } else if (type === "gallery") {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    return result;
  }
};

// ==============================================
// =              ask for camera permission     =
//==============================================

export const askForCameraPermission = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
};

// ==============================================
// =              upload image                 =
//==============================================

export const uploadImage = async (file, path, fName) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.responseType = "blob";

    xhr.open("GET", file, true);

    xhr.send(null);
  });

  const fileName = fName || randId(15);

  const imageRef = storage.ref(`${path}/${fileName}.jpeg`);

  const snapShot = await imageRef.put(blob, {
    contentType: "image/jpeg",
  });

  blob.close();

  const url = await storage.refFromURL(snapShot.ref).getDownloadURL();

  return { url, fileName };
};

// ==============================================
// =              create new group             =
//==============================================

export const createNewGroup = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;
    const db = getFirestore();

    let groupData = {
      ...data,
      createdAt: getFirestore().FieldValue.serverTimestamp(),
      participants: [],
      splits: [],
      expenses: [],
      color: "",
      createdBy: {
        email: user.email,
        uid: user.uid,
        phoneNumber: "",
        name: "",
        photoURL: "",
      },
    };

    const dbRef = db.collection("users").doc(user.uid);

    dbRef.collection("groups").doc().set(groupData);
  };
};

// ==============================================
// =              add expense                  =
//=============================================

export const createExpense = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;
    const db = getFirestore();

    const expenseData = {
      ...data,
      createdAt: Date.now,
      createdBy: {
        email: user.email,
        uid: user.uid,
        phoneNumber: "",
        name: "",
        photoURL: "",
      },
    };

    const dbRef = db.collection("users").doc(user.uid);

    dbRef
      .collection("groups")
      .doc()
      .update({
        expenses: firebase.firestore.FieldValue.arrayUnion(expenseData),
      });
  };
};

// ==============================================
// =              fetch user Info              =
//==============================================

export const getUserData = () => {
  return (useDispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;

    // Firestore
    const db = getFirestore();

    const dbRef = db.collection("users").doc(user.uid);

    dbRef.onSnapshot(
      (querySnapshot) => {
        console.log("querySnapshot", querySnapshot.data());
        useDispatch({
          type: "GET_USER_DATA",
          payload: querySnapshot.data(),
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
};

// ==============================================
// =              fetch user groups            =
//==============================================

export const getAllGroups = () => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;

    // Firestore
    const db = getFirestore();

    const dbRef = db.collection("users").doc(user.uid);

    dbRef
      .collection("groups")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (d) => {
          const data = [];
          d.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });

          dispatch({
            type: "GET_USER_GROUPS",
            payload: data,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };
};
