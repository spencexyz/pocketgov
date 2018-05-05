import {
  View,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native'
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles/FormScreenStyles'
import { connect } from 'react-redux'
import dismissKeyboard from 'dismissKeyboard'
// import SelectAuthorityScreen from '../screens/SelectAuthorityScreen'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import InputItem from '../components/InputItem'
// import CustomButton from '../components/CustomButton'
import ApiActions from '../actions/ApiActions'
// import PrefActions from '../actions/PrefActions'
// import { trackWithProperties } from '../utils/Analytics'
import ListItemPicker from '../components/ListItemPicker'
import InputItem from '../components/InputItem'
import ListItem from '../components/ListItem'

const options = {
  title: 'Image of Problem',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      typeOfProblem: 0,
      typeOfProperty: 0,
      typeOfBranch: 0,
      graffitiPropertyType: 0,
      graffitiFirstFloor: 0,
      graffitiProfane: 0,
      illegalParkingProperty: 0,
      loadingImage: false,
      loading: false,
      pothole1Val: 0,
      pothole2Val: 0,
      pothole3Val: 0,
      pothole4Val: 0,
      pothole5Val: 0,
      pothole6Val: 0,
      trash1Val: 0,
      trash2Val: 0,
      trash3Val: 0,
      trash4Val: 0,
      trash5Val: 0,
      trash6Val: 0,
      image: null,
      imageMsg: null,
      imageUri: '',
      illegalParkingAddress: '',
      illegalPlateNumber: '',
      missedTrashLocation: '',
      problemDesc: '',
      address: '',
      phone: '',
      email: '',
      latitude: null,
      longitude: null,
      anonymousVis: true,
      addressVis: true,
      currentLocation: false,
      response: {
        status: null,
        _bodyInit: null
      },
      problemPickerOptions: [
        'Select an Option...',
        'Abandoned Vehicle',
        'Animal Complaint',
        'Damaged/Fallen Tree',
        'Graffiti',
        'Illegal Parking',
        'Neighborhood Issue',
        'Pothole',
        'Snow on Sidewalk',
        'Snow on Street',
        'Trash/Recycle/Compost Collection or Cart Issue',
        'Other'
      ],
      propertyPickerOptions: [
        'Select an Option...',
        'Private Property',
        'Public Property',
        'Unknown'
      ],
      treePickerOptions: [
        'Select an Option...',
        'Arm',
        'Leg',
        'Waist'
      ],
      graffitiPropertyPickerOptions: [
        'Select an Option...',
        'Park',
        'Private',
        'Public',
        'RTD'
      ],
      graffitiPickerOptions: [
        'Select an Option...',
        'No',
        'Unknown (provide description)',
        'Yes'
      ],
      pothole1PickerOptions: [
        'Select an Option...',
        'Alley',
        'Gutter',
        'Street'
      ],
      pothole2PickerOptions: [
        'Select an Option...',
        'Asphalt',
        'Concrete'
      ],
      pothole3PickerOptions: [
        'Select an Option...',
        'North',
        'South',
        'East',
        'West'
      ],
      pothole4PickerOptions: [
        'Select an Option...',
        'Both',
        'Left',
        'Right'
      ],
      pothole5PickerOptions: [
        'Select an Option...',
        'Low Manhole Cover',
        'Pothole',
        'Service Cut (small cut in pavement)'
      ],
      pothole6PickerOptions: [
        'Select an Option...',
        'No',
        'Unknown',
        'Yes'
      ],
      trash1PickerOptions: [
        'Select an Option...',
        'Cancel',
        'Damaged',
        'Missed',
        'Other (please describe)',
        'Problem',
        'Replacement',
        'Sign Up'
      ],
      trash2PickerOptions: [
        'Select an Option...',
        'Auto Cart',
        'Compost',
        'Dumpster',
        'Extra Trash',
        'Manual',
        'Recycle'
      ],
      trash3PickerOptions: [
        'Select an Option...',
        'Cart Cracked',
        'Lid',
        'Other (please describe)',
        'Wheel'
      ],
      trash4PickerOptions: [
        'Select an Option...',
        'No',
        'Yes'
      ],
      trash5PickerOptions: [
        'Select an Option...',
        '35',
        '65',
        '95',
        'Unknown'
      ],
      trash6PickerOptions: [
        'Select an Option...',
        'Black (trash)',
        'Dumpster',
        'Green (compost)',
        'Purple (recycle)'
      ]
    }
  };

  showContactInput(param) {
    if (param === 'email') {
      this.setState({
        emailVis: true,
        phoneVis: false,
        anonymousVis: false,
      });
    } else if (param === 'phone') {
      this.setState({
        emailVis: false,
        phoneVis: true,
        anonymousVis: false
      });
    } else {
      this.setState({
        emailVis: false,
        phoneVis: false,
        anonymousVis: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response._bodyInit !== this.state.response._bodyInit) {
      this.setState({
        response: nextProps.response,
        loading: false
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let anonymousVis;
    const { typeOfProblem } = nextState;

    if (
      typeOfProblem === 1 ||
      typeOfProblem === 4 ||
      typeOfProblem === 5 ||
      typeOfProblem === 6 ||
      typeOfProblem === 7 ||
      typeOfProblem === 8 ||
      typeOfProblem === 9
    ) {
      anonymousVis = true;
    } else {
      anonymousVis = false;
    }
    if (this.state.error == true) {
      this.setState({
        error: false,
        typeOfProblemError: false,
        locationValidatedError: false,
        problemDescError: false,
        abandonedAddressError: false,
        plateNumberError: false,
        typeOfPropertyError: false,
        treeBlockingStreetError: false,
        treeAddressError: false,
        typeOfBranchError: false,
        graffitiPropertyPickerOptionsError: false,
        graffitiFirstFloorError: false,
        graffitiProfaneError: false,
        illegalParkingPropertyError: false,
        illegalParkingAddressError: false,
        illegalPlateNumberError: false,
        pothole1ValError: false,
        pothole2ValError: false,
        pothole3ValError: false,
        pothole4ValError: false,
        pothole5ValError: false,
        pothole6ValError: false,
        trash1ValError: false,
        trash2ValError: false,
        trash3ValError: false,
        trash4ValError: false,
        trash5ValError: false,
        trash6ValError: false,
        missedTrashLocationError: false,
        contactIsValidatedError: false,
        response: {
          status: null,
          _bodyInit: null
        },
        anonymousVis
      });
    } else if (this.state.response._bodyInit) {
      this.setState({
        response: {
          status: null,
          _bodyInit: null
        }
      });
    }
  }

  openCamera() {
    this.setState({
      loadingImage: true,
      imageMsg: null
    });
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
        this.setState({
          loadingImage: false,
        });
      }
      else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
        this.setState({
          image: null,
          loadingImage: false,
          imageMsg: 'There was an error with your image, please try again.'
        });
      }
      else {
        let source = { uri: response.uri };

        //needed for the post request
        let index = response.uri.lastIndexOf('.');
        let length = response.uri.length;
        let imageType = response.uri.substring(index + 1, length);

        response.imageType = imageType;

        this.setState({
          image: response,
          loadingImage: false,
          imageUri: source
        });
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: 'Current Location',
          error: null,
          currentLocation: true
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  validate() {
    let varQuestionsValidated = false;
    let standardQuestionsValidated = false;
    let locationValidatedError = true;
    let problemDescError = true;
    let isAllowedAnonymous = false;
    let contactIsValidated = false;
    let contactIsValidatedError = true;

    const { 
      typeOfProblem,
      address,
      latitude,
      longitude,
      problemDesc,
      email,
      phone,
      anonymousVis
    } = this.state;

    let standardQuestionsCounter = 0;
    //if type of problem is not completed then flag it
    if (typeOfProblem === 0) {
      this.setState({
        typeOfProblemError: true,
        error: true
      });

      return;
    }

    if (address || (latitude && longitude)) {
      locationValidatedError = false;
      standardQuestionsCounter++;
    }

    if (email || phone || anonymousVis) {
      contactIsValidated = true;
      contactIsValidatedError = false;
      standardQuestionsCounter++;
    }

    if (problemDesc) {
      problemDescError = false;
      standardQuestionsCounter++;
    }

    if (standardQuestionsCounter === 3) {
      standardQuestionsValidated = true;
    }

    let validatedCount = 0;

    if (typeOfProblem === 1) {
      //Abandoned Vehicle
      // all 3 submission types
      let abandonedAddressError = true;
      let plateNumberError = true;
      let typeOfPropertyError = true;

      if (this.state.abandonedAddress) {
        abandonedAddressError = false;
        validatedCount++;
      }

      if (this.state.plateNumber) {
        plateNumberError = false;
        validatedCount++;
      }

      if (this.state.typeOfProperty) {
        typeOfPropertyError = false;
        validatedCount++;
      }

      if (validatedCount === 3) {
        varQuestionsValidated = true;
      }

      this.setState({
        abandonedAddressError,
        plateNumberError,
        typeOfPropertyError,
        problemDescError,
        locationValidatedError,
        contactIsValidatedError,
        // error: true
      });
    } else if (typeOfProblem === 3) {
      //Fallen Tree
      //phone, email
      let treeBlockingStreetError = true;
      let treeAddressError = true;
      let typeOfBranchError = true;

      if (this.state.treeAddress) {
        treeAddressError = false;
        validatedCount++;
      }

      if (this.state.typeOfBranch) {
        typeOfBranchError = false;
        validatedCount++;
      }

      if (validatedCount === 2) {
        varQuestionsValidated = true;
      }

      this.setState({
        treeAddressError,
        typeOfBranchError,
        problemDescError,
        locationValidatedError,
        contactIsValidatedError,
        // error: true
      });

    } else if (typeOfProblem === 4) {
      // Graffiti
      // all 3
      let graffitiPropertyPickerOptionsError = true;
      let graffitiFirstFloorError = true;
      let graffitiProfaneError = true;

      if (this.state.graffitiPropertyType) {
        graffitiPropertyPickerOptionsError = false;
        validatedCount++;
      }

      if (this.state.graffitiFirstFloor) {
        graffitiFirstFloorError = false;
        validatedCount++;
      }

      if (this.state.graffitiProfane) {
        graffitiProfaneError = false;
        validatedCount++;
      }

      if (validatedCount === 3) {
        varQuestionsValidated = true;
      }

      this.setState({
        graffitiPropertyPickerOptionsError,
        graffitiFirstFloorError,
        graffitiProfaneError,
        problemDescError,
        locationValidatedError,
        contactIsValidatedError,
        // error: true
      })

    } else if (typeOfProblem === 5) {
      // Illegal Parking
      //all 3
      let illegalParkingPropertyError = true;
      let illegalParkingAddressError = true;
      let illegalPlateNumberError = true;

      if (this.state.illegalParkingProperty) {
        illegalParkingPropertyError = false;
        validatedCount++;
      }

      if (this.state.illegalParkingAddress) {
        illegalParkingAddressError = false;
        validatedCount++;
      }

      if (this.state.illegalPlateNumber) {
        illegalParkingAddressError = false;
        validatedCount++;
      }

      if (validatedCount === 3) {
        varQuestionsValidated = true;
      }

      this.setState({
        illegalParkingPropertyError,
        illegalParkingAddressError,
        illegalPlateNumberError,
        problemDescError,
        locationValidatedError,
        contactIsValidatedError,
        // error: true
      });

    } else if (typeOfProblem === 7) {
      // Pothole
      //all 3
      let pothole1ValError = true;
      let pothole2ValError = true;
      let pothole3ValError = true;
      let pothole4ValError = true;
      let pothole5ValError = true;
      let pothole6ValError = true;

      if (this.state.pothole1Val) {
        pothole1ValError = false;
        validatedCount++;
      }

      if (this.state.pothole2Val) {
        pothole2ValError = false;
        validatedCount++;
      }

      if (this.state.pothole3Val) {
        pothole3ValError = false;
        validatedCount++;
      }

      if (this.state.pothole4Val) {
        pothole4ValError = false;
        validatedCount++;
      }

      if (this.state.pothole5Val) {
        pothole5ValError = false;
        validatedCount++;
      }

      if (this.state.pothole6Val) {
        pothole6ValError = false;
        validatedCount++;
      }

      if (validatedCount === 6) {
        varQuestionsValidated = true;
      }

      this.setState({
        pothole1ValError,
        pothole2ValError,
        pothole3ValError,
        pothole4ValError,
        pothole5ValError,
        pothole6ValError,
        problemDescError,
        locationValidatedError,
        contactIsValidatedError,
        // error: true
      });
    } else if (typeOfProblem === 10) {
      // Trash
      //phone, email
      let trash1ValError = true;
      let trash2ValError = true;
      let trash3ValError = true;
      let trash4ValError = true;
      let trash5ValError = true;
      let trash6ValError = true;
      let missedTrashLocationError = true;

      if (this.state.trash1Val) {
        trash1ValError = false;
        validatedCount++;
      }

      if (this.state.trash2Val) {
        trash2ValError = false;
        validatedCount++;
      }

      if (this.state.missedTrashLocation) {
        missedTrashLocationError = false;
        validatedCount++;
      }

      if (this.state.trash3Val) {
        trash3ValError = false;
        validatedCount++;
      }

      if (this.state.trash4Val) {
        trash4ValError = false;
        validatedCount++;
      }

      if (this.state.trash5Val) {
        trash5ValError = false;
        validatedCount++;
      }

      if (this.state.trash6Val) {
        trash6ValError = false;
        validatedCount++;
      }

      if (validatedCount === 7) {
        varQuestionsValidated = true;
      }

      this.setState({
        trash1ValError,
        trash2ValError,
        trash3ValError,
        trash4ValError,
        trash5ValError,
        trash6ValError,
        missedTrashLocationError,
        problemDescError,
        locationValidatedError,
        contactIsValidatedError,
        // error: true
      });
    } else if (
      typeOfProblem === 2 ||
      typeOfProblem === 11 ||
      typeOfProblem === 9 ||
      typeOfProblem === 8 ||
      typeOfProblem === 6
    ) {
      //animal complaint
      //phone, email

      // Other
      // phone, email

      // Snow on Street
      //all 3

      // Snow on Sidewalk
      //all 3

      // Neighborhood Issue
      //all 3

      varQuestionsValidated = true;

      this.setState({
        problemDescError,
        locationValidatedError,
        contactIsValidatedError,
      });
    }

    if (varQuestionsValidated && standardQuestionsValidated) {
      this.setState({
        loading: true
      });
      this.props.dispatch(ApiActions.submitTicket(this.state));
      return;
    }

    this.setState({
      error: true
    });

    // this.props.dispatch(ApiActions.submitTicket(this.state));
  }

  renderContactOptions(problemId) {
    const { typeOfProblem } = this.state;

    if (
      typeOfProblem === 1 ||
      typeOfProblem === 4 ||
      typeOfProblem === 5 ||
      typeOfProblem === 6 ||
      typeOfProblem === 7 ||
      typeOfProblem === 8 ||
      typeOfProblem === 9
    ) {
      return (
        <View style={styles.prefContainer}>
          <ListItem
            checkbox={true}
            value={this.state.anonymousVis}
            customStyle={{ flex: 1, marginRight: 30 }}
            text={'Anonymous'}
            toggle={this.showContactInput.bind(this, 'anonymous')} 
          />
          <ListItem
            checkbox={true}
            value={this.state.phoneVis}
            customStyle={{ flex: 1 }}
            text={'Phone'}
            toggle={this.showContactInput.bind(this, 'phone')} 
          />
          <ListItem 
            checkbox={true} 
            value={this.state.emailVis} 
            customStyle={{ flex: 1 }} 
            text={'Email'} 
            toggle={this.showContactInput.bind(this, 'email')} 
          />
        </View>
      );
    } else {
      return (
        <View style={styles.prefContainer}>
          <ListItem
            checkbox={true}
            value={this.state.phoneVis}
            customStyle={{ flex: 1 }}
            text={'Phone'}
            toggle={this.showContactInput.bind(this, 'phone')} 
          />
          <ListItem 
            checkbox={true} 
            value={this.state.emailVis} 
            customStyle={{ flex: 1 }} 
            text={'Email'} 
            toggle={this.showContactInput.bind(this, 'email')} 
          />
        </View>
      );
    }
  }

  showAddressInput(param) {
    if (param === 'address') {
      this.setState({
        addressVis: true,
        currentLocationVis: false
      });
    } else {
      this.setState({
        addressVis: false,
        currentLocationVis: true
      });
    }
  }

  renderContactInput() {
    if (this.state.phoneVis) {
      return ( 
        <InputItem 
          access={'your phone number'}
          label={'Phone Number'}
          editable={true}
          value={this.state.phone}
          setVal={this.updateState.bind(this, 'phone')}
          keyboardType={'numeric'} 
          placeholder={'your number'}
        />
      );
    } else if (this.state.emailVis) {
      return (
        <InputItem
          access={'your email'}
          label={'Email'}
          editable={true}
          value={this.state.email}
          setVal={this.updateState.bind(this, 'email')}
          keyboardType={'email-address'}
          placeholder={'your email'} 
        />
      );
    } else {
      return;
    }
  }

  removeImage() {
    this.setState({
      image: null,
      imageUri: null
    });
  }

  updateState(key, param) {
    let obj = {};
    obj[key] = param;
    this.setState(obj);
  }

  enterAnAddress() {
    this.setState({
      currentLocation: false,
      address: '',
      latitude: '',
      longitude: ''
    });
  }

  get renderMsg() {
    console.log('response');
    console.log(this.state.response);
    if (this.state.response.status === 201) {
      return <Text style={styles.successMsg}>Your ticket has been submitted!{"\n"}(No. {this.state.response._bodyInit})</Text>;
    } else if (this.state.response.status === 500) {
      return <Text style={styles.errorMsg}>Error! {this.state.response._bodyInit}</Text>;
    } else if (this.state.response.status === 400) {
      return <Text style={styles.errorMsg}>Hmm... We're not sure why this isn't working. Please contact us via the feedback form.</Text>;
    } else {
      return null;
    }
  }

  renderExtraQuestions(question) {
    switch(question) {
      case 1:
          return this.renderAbandonedVehicleExpansion();
          break;
      case 3:
          return this.renderTreeExpansion();
          break;
      case 4:
          return this.renderGraffitiExpansion();
          break;
      case 5:
          return this.renderIllegalParkingGraffitiExpansion();
          break;
      case 7:
          return this.renderPotholeExpansion();
          break;
      case 10:
          return this.renderTrashExpansion();
          break;
      default:
          return null;
    }
  }

  //Abandoned Vehicle Expansion
  renderAbandonedVehicleExpansion() {
    return (
      <View>
        {this.state.typeOfPropertyError ?
          <Text style={styles.errorMsg}>Missing property type.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Type of Property</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.typeOfProperty}
          press={(itemValue) => this.setState({ typeOfProperty: itemValue })}
          pickerData={this.state.propertyPickerOptions}
        />
        {this.state.abandonedAddressError ?
          <Text style={styles.errorMsg}>Missing vehicle location.</Text>:
          null
        }
        <InputItem 
          access={'enter the exact location of the vehicle.'}
          label={'Vehicle Location'}
          editable={true}
          value={this.state.abandonedAddress}
          setVal={this.updateState.bind(this, 'abandonedAddress')}
          placeholder={'123 Wynkoop St.'}
        />
        {this.state.plateNumberError ?
          <Text style={styles.errorMsg}>Missing plate number.</Text>:
          null
        }
        <InputItem 
          access={'enter the plate number.'}
          label={'Plate Number'}
          editable={true}
          value={this.state.plateNumber}
          setVal={this.updateState.bind(this, 'plateNumber')}
          placeholder={'WAQ 4000'}
        />
      </View>
    );
  }
  /////////////////////////////

  //Damaged/Fallen Tree
  renderTreeExpansion() {
    return (
      <View>
        {this.state.treeBlockingStreetError ?
          <Text style={styles.errorMsg}>Missing right of way status.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Is the tree blocking street access and/or right of way?</Text>
        <View style={styles.prefContainer}>
          <ListItem
            checkbox={true}
            value={!this.state.treeBlockingStreet}
            customStyle={{ flex: 1 }}
            text={'No'}
            toggle={() => this.setState({ treeBlockingStreet: false })}
          />
          <ListItem
            checkbox={true}
            value={this.state.treeBlockingStreet}
            customStyle={{ flex: 1 }}
            text={'Yes'}
            toggle={() => this.setState({ treeBlockingStreet: true })} 
          />
        </View>
        {this.state.treeAddressError ?
          <Text style={styles.errorMsg}>Missing tree location.</Text>:
          null
        }
        <InputItem 
          access={'enter the exact location of the tree.'}
          label={'Exact location of the tree'}
          editable={true}
          value={this.state.treeAddress}
          setVal={this.updateState.bind(this, 'treeAddress')}
          placeholder={'In the middle of Blake St.'}
        />
        {this.state.typeOfBranchError ?
          <Text style={styles.errorMsg}>Missing branch size.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Size of branch?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.typeOfBranch}
          press={(itemValue) => this.setState({typeOfBranch: itemValue})}
          pickerData={this.state.treePickerOptions}
        />
      </View>
    );
  }
  /////////////////////////////

  //Graffiti
  renderGraffitiExpansion() {
    return (
      <View>
        {this.state.graffitiPropertyPickerOptionsError ?
          <Text style={styles.errorMsg}>Missing property type.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Type of Property</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.graffitiPropertyType}
          press={(itemValue) => this.setState({graffitiPropertyType: itemValue})}
          pickerData={this.state.graffitiPropertyPickerOptions}
        />
        {this.state.graffitiFirstFloorError ?
          <Text style={styles.errorMsg}>Missing graffiti height.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Is graffiti above the first floor?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.graffitiFirstFloor}
          press={(itemValue) => this.setState({graffitiFirstFloor: itemValue})}
          pickerData={this.state.graffitiPickerOptions}
        />
        {this.state.graffitiProfaneError ?
          <Text style={styles.errorMsg}>Missing graffiti profanity.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Is graffiti profane or racist?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.graffitiProfane}
          press={(itemValue) => this.setState({graffitiProfane: itemValue})}
          pickerData={this.state.graffitiPickerOptions}
        />
      </View>
    );
  }
  /////////////////////////////

  //IllegalParking
  renderIllegalParkingGraffitiExpansion() {
    return (
      <View>
        {this.state.illegalParkingPropertyError ?
          <Text style={styles.errorMsg}>Missing property type.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Type of Property</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.illegalParkingProperty}
          press={(itemValue) => this.setState({illegalParkingProperty: itemValue})}
          pickerData={this.state.propertyPickerOptions}
        />
        {this.state.illegalParkingAddressError ?
          <Text style={styles.errorMsg}>Missing vehicle location.</Text>:
          null
        }
        <InputItem 
          access={'enter the exact location of the vehicle.'}
          label={'Vehicle Location'}
          editable={true}
          value={this.state.illegalParkingAddress}
          setVal={this.updateState.bind(this, 'illegalParkingAddress')}
          placeholder={'123 Wynkoop St.'}
        />
        {this.state.illegalPlateNumberError ?
          <Text style={styles.errorMsg}>Missing vehicle plate number.</Text>:
          null
        }
        <InputItem 
          access={'enter the plate number.'}
          label={'Plate Number'}
          editable={true}
          value={this.state.illegalPlateNumber}
          setVal={this.updateState.bind(this, 'illegalPlateNumber')}
          placeholder={'WAQ 4000'}
        />
      </View>
    );
  }
  /////////////////////////////

  //Pothole
  renderPotholeExpansion() {
    return (
      <View>
        {this.state.pothole1ValError ?
          <Text style={styles.errorMsg}>Missing pothole location.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Where is the pothole located?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.pothole1Val}
          press={(itemValue) => this.setState({pothole1Val: itemValue})}
          pickerData={this.state.pothole1PickerOptions}
        />
        {this.state.pothole2ValError ?
          <Text style={styles.errorMsg}>Missing pothole surface type.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>What is the pothole surface?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.pothole2Val}
          press={(itemValue) => this.setState({pothole2Val: itemValue})}
          pickerData={this.state.pothole2PickerOptions}
        />
        {this.state.pothole3ValError ?
          <Text style={styles.errorMsg}>Missing pothole directional location.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Direction of travel</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.pothole3Val}
          press={(itemValue) => this.setState({pothole3Val: itemValue})}
          pickerData={this.state.pothole3PickerOptions}
        />
        {this.state.pothole4ValError ?
          <Text style={styles.errorMsg}>Missing pothole lane.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Which lane?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.pothole4Val}
          press={(itemValue) => this.setState({pothole4Val: itemValue})}
          pickerData={this.state.pothole4PickerOptions}
        />
        {this.state.pothole5ValError ?
          <Text style={styles.errorMsg}>Missing pothole description.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Describe the damage</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.pothole5Val}
          press={(itemValue) => this.setState({pothole5Val: itemValue})}
          pickerData={this.state.pothole5PickerOptions}
        />
        {this.state.pothole6ValError ?
          <Text style={styles.errorMsg}>Missing pothole depth.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Can you see the bottom?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.pothole6Val}
          press={(itemValue) => this.setState({pothole6Val: itemValue})}
          pickerData={this.state.pothole6PickerOptions}
        />
      </View>
    );
  }
  /////////////////////////////

  //Trash
  renderTrashExpansion() {
    return (
      <View>
        {this.state.trash1ValError ?
          <Text style={styles.errorMsg}>Missing issue.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>What is the issue?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.trash1Val}
          press={(itemValue) => this.setState({trash1Val: itemValue})}
          pickerData={this.state.trash1PickerOptions}
        />
        {this.state.trash2ValError ?
          <Text style={styles.errorMsg}>Missing service type.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>What type of service?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.trash2Val}
          press={(itemValue) => this.setState({trash2Val: itemValue})}
          pickerData={this.state.trash2PickerOptions}
        />
        {this.state.missedTrashLocationError ?
          <Text style={styles.errorMsg}>Missing location.</Text>:
          null
        }
        <InputItem 
          access={'exact location of missed trash.'}
          label={'If missed, where is trash now?'}
          editable={true}
          value={this.state.missedTrashLocation}
          setVal={this.updateState.bind(this, 'missedTrashLocation')}
          placeholder={'On the golf course...'}
        />
        {this.state.trash3ValError ?
          <Text style={styles.errorMsg}>Missing damage type.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>If damaged, what type of damage?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.trash3Val}
          press={(itemValue) => this.setState({trash3Val: itemValue})}
          pickerData={this.state.trash3PickerOptions}
        />
        {this.state.trash4ValError ?
          <Text style={styles.errorMsg}>Missing request answer.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>Are you requesting a replacement of a stolen cart?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.trash4Val}
          press={(itemValue) => this.setState({trash4Val: itemValue})}
          pickerData={this.state.trash4PickerOptions}
        />
        {this.state.trash5ValError ?
          <Text style={styles.errorMsg}>Missing cart size.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>What is the size of the cart?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.trash5Val}
          press={(itemValue) => this.setState({trash5Val: itemValue})}
          pickerData={this.state.trash5PickerOptions}
        />
        {this.state.trash6ValError ?
          <Text style={styles.errorMsg}>Missing cart color.</Text>:
          null
        }
        <Text style={styles.nestedQuestion}>What is the color of the cart?</Text>
        <ListItemPicker
          label={'Stop'}
          val={this.state.trash6Val}
          press={(itemValue) => this.setState({trash6Val: itemValue})}
          pickerData={this.state.trash6PickerOptions}
        />
      </View>
    );
  }
  /////////////////////////////

  render() {
    return (
      <KeyboardAwareScrollView 
        style={styles.container}
        extraScrollHeight={50}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.header, {paddingTop: 0}]}>Type of Problem</Text>
          {this.state.typeOfProblemError ?
            <Text style={[styles.errorMsg, { marginBottom: 1 }]}>Please pick a problem type.</Text>:
            null
          }
        </View>
        <ListItemPicker
          label={'Stop'}
          val={this.state.typeOfProblem}
          press={(itemValue) => this.setState({typeOfProblem: itemValue})}
          pickerData={this.state.problemPickerOptions}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Description of Problem</Text>
        </View>
        {this.renderExtraQuestions(this.state.typeOfProblem)}
        {this.state.problemDescError ?
          <Text style={styles.errorMsg}>Missing a description.</Text>:
          null
        }
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Please describe the problem</Text>
          <TextInput
            accessibilityLabel={'Please describe the problem input field'}
            underlineColorAndroid='#FFF'
            style={styles.input}
            multiline={true}
            placeholder='What seems to be the problem?'
            onChangeText={(problemDesc) => this.setState({problemDesc})}
            value={this.state.problemDesc}
            returnKeyType='done'
            blurOnSubmit={true}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Add an Image</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.openCamera()}
            style={[styles.buttonContainer, { backgroundColor: this.state.image ? '#B39DDB' : '#4da0e6' }]}
          >
            <View>
              {this.state.loadingImage ? 
                <ActivityIndicator size="small" color="#fff" /> :
                <Text style={[styles.buttonText]}>{this.state.image ? 'Upload a Different Image' : 'Select Image'}</Text>
              }
            </View>
          </TouchableOpacity>
          {this.state.imageMsg ? 
            <Text style={styles.imageFailure}>
              {this.state.imageMsg}
            </Text> :
            null
          }
          {this.state.imageUri ? 
            <View style={{flex:1}}>
              <Image
                style={styles.image}
                resizeMode={'contain'}
                source={this.state.imageUri}
              />
              <Icon onPress={() => this.removeImage()} style={styles.deleteIcon} name={'times'} size={35} color={'red'}></Icon>
            </View> :
            null
          }
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Add a Location</Text>
        </View>
        <View>
          <Text
            style={[styles.subText, { paddingLeft: 15, paddingTop: 5 }]}
          >
            If you don't know the address you can also just give us an intersection, i.e. Kentucky St. & Vine St.
          </Text>
          {this.state.locationValidatedError ?
            <Text style={[styles.errorMsg, { marginBottom: 1 }]}>Please add a location.</Text>:
            null
          }
          <InputItem
            access={'the address associated with your ticket'}
            label={'Address'}
            editable={this.state.currentLocation ? false : true}
            value={this.state.address}
            setVal={this.updateState.bind(this, 'address')}
            placeholder={'123 Wynkoop St.'}
          />
          {this.state.currentLocation ?
            <TouchableOpacity
              accessibilityTraits={'button'}
              onPress={() => this.enterAnAddress()}
              style={[styles.buttonContainer, { backgroundColor: '#4CAF50' }]}
            >
              <View>
                <Text style={[styles.buttonText]}>Enter an Address</Text>
              </View>
            </TouchableOpacity> :
            <TouchableOpacity
              accessibilityTraits={'button'}
              onPress={() => this.getCurrentLocation()}
              style={[styles.buttonContainer, { backgroundColor: '#4da0e6' }]}
            >
              <View>
                <Text style={[styles.buttonText]}>Use Current Location Instead</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Preferred Method of Contact</Text>
        </View>
        <Text style={styles.subText}>You will only be contacted if we have a question.</Text>
        {this.state.contactIsValidatedError ?
          <Text style={[styles.errorMsg, { marginBottom: 1 }]}>Please select a contact option.</Text>:
          null
        }
        { this.renderContactOptions() }
        { this.renderContactInput() }
        {this.state.error ?
          <Text style={styles.errorMsg}>Form not submitted. See errors above.</Text>:
          null
        }
        {this.renderMsg}
        <TouchableOpacity
          accessibilityTraits={'button'}
          onPress={() => this.validate()}
          style={[styles.buttonContainer, { marginBottom: 80 }]}
        >
          <View>
            {this.state.loading ?
              <ActivityIndicator size="small" color="#fff" />:
              <Text style={[styles.buttonText]}>Send Us Your Feedback</Text>
            }
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { response } = state.apiReducer;

  return { response };
}

export default connect(mapStateToProps)(HomeScreen)
