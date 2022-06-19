export const registerUser = (email, password, fullName) => {
  return (useDispatch, useState, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    const db = getFirestore();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            user.sendEmailVerification().then((state) => {
              console.log("email verification =>", state);
            });

            const userRef = db.collection("users").doc(user.uid);
            userRef
              .set({
                displayName: fullName,
                phoneNumber: phone,
                email: email,
                photoUrl: "",
              })
              .then(() => {})
              .catch((error) => {
                console.log("db =>", error);
              });
          }
        });
      })
      .catch((error) => {
        console.log("authError =>", error);
      });
  };
};

export const loginUser = (email, password) => {
  return (useDispatch, useState, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((error) => {
        console.log("authError =>", error);
      });
  };
};

export const signOut = () => {
  return (dispatch, state, { getFirebase }) => {
    const auth = getFirebase().auth();
    auth
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log("authError =>", error);
      });
  };
};
