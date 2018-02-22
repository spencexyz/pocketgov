# pocketgov

### What is this?

Denver's ["Report a Problem"](https://www.denvergov.org/pocketgov/#/report-a-problem) form is now on mobile! Take advantage of mobile-specific features like the Camera Roll and Current Location to easily report issues around the city. As Denver continues to grow we need your help in making sure everything is running smoothly.

This app is an open-source project run by residents of Denver and not YET officially endorsed by the city.

### Get Up and Running Locally

`git clone https://github.com/spencexyz/pocketgov.git`

`npm install`

`react-native run-ios` (this opens it up on the sim)

More information on [React Native](https://facebook.github.io/react-native/)

Create a `config.js` file like this.

```
const AIRTABLE_ZAP = "";
const SLACK_ZAP = "";

export default {
  AIRTABLE_ZAP,
  SLACK_ZAP
}
```

### For designers

To submit designs just create an issue and drop in your files. If any of your changes are added we will make sure to credit you appropriately.


##### In the store
https://itunes.apple.com/us/app/pocketgov/id1335773975?mt=8&ign-itsct=1335773975-1335773975&ign-itscg=0177&ign-mpt=uo%3D4