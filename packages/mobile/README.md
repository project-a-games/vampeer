# Vampeer
Vampiring with peers

### [Project Development Cloud](https://drive.google.com/drive/folders/1sOx2IHF1yfBQR5zXGFhM28WfHAC_K6ue?usp=sharing)

## Installation

See [React-Native Environment Setup](https://reactnative.dev/docs/environment-setup)

Run `npm run android` or `npm run ios`

## Dev Notes

* Persistance
    - [AsyncStorage](https://github.com/react-native-community/async-storage)
        - Built in to react-native
        - Key-Value pair usage
        - Not for large data-sets
        - No encryption
        - Might be deleted
    - [Realm](https://realm.io/docs/javascript/latest/)
        - Seems like cool new db lib built for JS and React-Native specifically
        - Encryption uses native libraries for ios-android-windows etc.
        - Has cloud syncing features (don't think we'll use though)

### Contributors
**Senpai:** Adam Merritt <3

**Kohai:** Abigail Williams