# Vampeer
Vampiring with peers

### [Project Development Cloud](https://drive.google.com/drive/folders/1sOx2IHF1yfBQR5zXGFhM28WfHAC_K6ue?usp=sharing)

## Installation

See [React-Native Environment Setup](https://reactnative.dev/docs/environment-setup)

Run `npm run android` or `npm run ios`

## Dev Notes

* New Setup
    - Install w/o hoisting
    - IOS has some weird fix involving adding/removing quotes from some setting (look up error message)
    - See auth0 Quick Start React-Native for auth0 configuration
        - Configure Android
            - Edit AndroidManifest.xml: "you must make sure the activity you are going to receive the authentication on has a launchMode value of singleTask and that it declares the following intent filter (see the React Native docs for more information)
        - Configure IOS
    - Setup react-native-vector-icons
        - add to android/app/build.gradle: `apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"`

* Localhost network setup
    - https://revs.runtime-revolution.com/connecting-react-native-to-localhost-65e7ddf43d02
    - Updated AndroidManifest.xml with:
        - `android:usesCleartextTraffic="true"
        android:networkSecurityConfig="@xml/network_security_config"`
    - Added network_security_config.xml to main/res/xml
    - Go to debug settings in android and set network to localhost ip


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