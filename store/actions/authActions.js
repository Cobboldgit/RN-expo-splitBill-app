export const registerUser = (email, password, fullName, phone) => {
  return (useDispatch, useState, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    const db = getFirestore();
    const user = auth.currentUser;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth.onAuthStateChanged(() => {
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
                photoURL: "",
              })
              .then(() => {
                user.updateProfile({
                  displayName: fullName,
                  phoneNumber: phone,
                  email: email,
                });
              })
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

export const updateProfile = ({
  displayName,
  email,
  phoneNumber,
  photoURL,
}) => {
  return (useDispatch, useState, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    const db = getFirestore();
    const user = auth.currentUser;
    const userRef = db.collection("users").doc(auth.currentUser.uid);

    if (user) {
      userRef
        .set({
          displayName: displayName,
          phoneNumber: phoneNumber,
          email: email,
          photoURL: photoURL,
        })
        .then(() => {
          user.updateProfile({
            displayName: displayName,
            phoneNumber: phoneNumber,
            email: email,
            photoURL: photoURL,
          });
        })
        .catch((error) => {
          console.log("db => ", error);
        });
    }
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
