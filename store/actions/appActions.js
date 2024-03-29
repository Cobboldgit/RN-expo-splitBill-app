import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/firebase";
import firebase from "../../firebase/firebase";

// ==============================================
// =              rate info                    =
//=============================================

export const setRateInfo = (data) => {
  return {
    type: "SET_RATEINFO",
    payload: data,
  };
};

// ==============================================
// =              data from part               =
//=============================================

export const setDataFromAddParticipant = (data) => {
  return {
    type: "SET_DATAFROMADDPARTICIPANT",
    payload: data,
  };
};

// ==============================================
// =              data from edit group name    =
//=============================================

export const setDataFromEditGroupName = (data) => {
  return {
    type: "SET_DATAFROMEDITGROUPNAME",
    payload: data,
  };
};

// ==============================================
// =              equal split                  =
//=============================================

export const setEqualSplit = (state) => {
  return {
    type: "SET_EQUAL_SPLIT",
    payload: state,
  };
};

export const updateSplit = (data) => {
  return {
    type: "SET_SPLIT",
    payload: data,
  };
};

// ==============================================
// =              clear participant            =
//=============================================
export const clearParticipants = () => {
  return {
    type: "CLEAR_PARTICIPANTS",
  };
};

// ==============================================
// =              add participant              =
//=============================================

export const addParticipant = (data) => {
  return {
    type: "ADD_PARTICIPANT",
    payload: data,
  };
};

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

// ==============================================
// =              select who to pay            =
//=============================================
export const setSelectedPaidBy = (contact) => {
  return {
    type: "SET_SELECTED_PAID_BY",
    payload: contact,
  };
};

export const setSelectedImage = (url) => {
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
// =              check if member exist         =
//==============================================

export const checkIfMemberExist = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const participants = useState().appReducer.groupsData[0].participants;

    const result = participants.find((p) => p.phoneNumber === data.phoneNumber);

    return result;
  };
};

// ==============================================
// =              create new group             =
//==============================================

export const createNewGroup = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;
    const db = getFirestore();
    const userData = useState().appReducer.userData;

    let groupData = {
      ...data,
      createdAt: getFirestore().FieldValue.serverTimestamp(),
      participants: [
        {
          contactName: userData.displayName,
          phoneNumber: userData.phoneNumber,
        },
      ],
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
// =              edit group                   =
//=============================================

export const editGroup = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;
    const db = getFirestore();

    const { groupName, participants, groupId, photoURL } = data;

    const dbRef = db.collection("users").doc(user.uid);

    dbRef
      .collection("groups")
      .doc(groupId)
      .update({
        groupName,
        photoURL,
        participants: getFirestore().FieldValue.arrayUnion(...participants),
      })
      .then((result) => {
        alert("done");
      })
      .catch((error) => {
        console.log(error);
      });
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
      createdAt: Date.now(),
      id: randId(20),
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
      .doc(expenseData.groupId)
      .update({
        expenses: firebase.firestore.FieldValue.arrayUnion(expenseData),
      });
  };
};

// ==============================================
// =              edit expense                  =
//==============================================

export const editExpense = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;
    const db = getFirestore();
    const groups = useState().appReducer.groupsData;

    const expense = groups.map((item) => {
      const expense = item.expenses.find((e) => e.id === data.id);
      return expense;
    });

    if (data.photoURL != undefined && data.photoURL != null)
      expense[0].photoURL = data.photoURL;

    // const updateData = groups.map((item) => {
    //   if (data.groupId === item.id) {
    //     return expense[0];
    //   }
    //   return item;
    // })

    // console.log(updateData);

    const dbRef = db.collection("users").doc(user.uid);
    dbRef.collection("groups").doc(data.groupId).update({
      expenses: expense,
    });
  };
};

// ==============================================
// =              send a comment               =
//==============================================

export const sendMessage = (data) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;
    const db = getFirestore();

    const dbRef = db.collection("users").doc(user.uid);
    const groupRef = dbRef.collection("groups").doc(data.groupId);
    const expenseRef = groupRef.collection("comments").doc(data.roomId);

    expenseRef
      .update({
        lastMessage: data,
        messages: firebase.firestore.FieldValue.arrayUnion(data),
      })
      .then(() => {
        console.log("message sent");
      });
  };
};

export const getComments = (groupId, roomId) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    const user = getFirebase().auth().currentUser;
    const db = getFirestore();

    const dbRef = db.collection("users").doc(user.uid);
    const groupRef = dbRef.collection("groups").doc(groupId);
    const commentsRef = groupRef.collection("comments").doc(roomId);

    commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.data()?.messages.map((message) => {
        return {
          ...message,
          createdAt: message.createdAt.toDate(),
        };
      });

      if (comments) {
        dispatch({
          type: "GET_COMMENTS",
          payload: {
            lastMessage: snapshot.data().lastMessage,
            messages: comments,
          },
        });
      } else {
        dispatch({
          type: "GET_COMMENTS",
          payload: null,
        });
      }
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
      .orderBy("createdAt", "asc")
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
