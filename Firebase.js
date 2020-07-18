import firebase from "firebase";
import firebaseKeys from "./config";

let firebaseConfig = firebaseKeys;

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  uploadPhotoSync = (uri) => {
    const path = `photos/${Date.now()}.jpg`;
    const response = fetch(uri);
    const file = response.blob();

    let upload = firebase.storage().ref(path).put(file);

    upload.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        rej(err);
      },

      () => {
        const url = upload.snapshot.ref.getDownloadURL();
        return url;
      }
    );
  };

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },

        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  CreateUser = (name, email, phone, password, address) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.database().ref("Users").push({ email, name, phone, address });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  UserLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  UserLogOut = () => {
    firebase.auth().signOut();
  };
}

Fire.shared = new Fire();
export default Fire;
