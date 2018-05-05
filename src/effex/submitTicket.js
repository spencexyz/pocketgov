import ApiActions from '../actions/ApiActions';
import CONFIG from '../../config';

export default async function submitTicket({action, dispatch, getState}: EffectParams) {
  const data = action.payload;
  let requestBody = {
    "ContactEmail": null,
    "ContactPhone": null,
    "CaseType": null,
    "Comments": null,
    "IsAnonymous": null,
    "Latitude": data.latitude,
    "Longitude": data.longitude,
    // "StaticMap": "//maps.googleapis.com/maps/api/staticmap?&center=799%20S%20University%20Blvd,%20Denver,%20CO%2080209%20Denver,%20CO&markers=799%20S%20University%20Blvd,%20Denver,%20CO%2080209%20Denver,%20CO&size=300x300&zoom=16",
    "StaticMap": null,
    // "//maps.googleapis.com/maps/api/staticmap?&center=39.700148299999995,-104.9594503&markers=39.700148299999995,-104.9594503&size=300x300&zoom=17"
    "LocationInfo": null,
    "Attachments": null,
    "Questions": []
  };

  //this URL validates addresses
  //https://www.denvergov.org/api/addresses/InDenver?address=21st%20and%20federal

  //create image object
  if (data.image) {
    requestBody.Attachments = [];
    requestBody.Attachments.push({
      // Attachment: data.image.data,
      Attachment: '',
      FileName: 'TicketImage.' + data.image.imageType,
      ImageType: data.image.imageType
    });
  }

  if (data.longitude && data.latitude) {
    requestBody.StaticMap = "//maps.googleapis.com/maps/api/staticmap?&center=" + data.latitude + "," + data.longitude + "&markers=" + data.latitude + "," + data.longitude + "&size=300x300&zoom=17"
  } else if (data.address) {
    //append denver to the end in case they don't include it
    let encodedAdr = encodeURIComponent(data.address) + '%20Denver%20CO';
    requestBody.StaticMap = "//maps.googleapis.com/maps/api/staticmap?&center=" + encodedAdr + "&markers=" + encodedAdr + "&size=300x300&zoom=16";
  }

  //set contact data
  if (data.phone) {
    requestBody.ContactPhone = data.phone + '';
    requestBody.IsAnonymous = false;
  } else if (data.email) {
    requestBody.ContactEmail = data.email;
    requestBody.IsAnonymous = false;
  } else {
    requestBody.IsAnonymous = true;
  }

  //everything has a problemDesc I believe, so we'll add
  //that up here
  if (data.problemDesc) {
    requestBody.Comments = data.problemDesc;
  }

  //TODO: take into consideration lat, long, etc
  if (data.address) {
    requestBody.LocationInfo = data.address;
  }

  if (data.typeOfProblem === 1) {
    requestBody.CaseType = "REP_ABANDONEDVEHICLE";
    requestBody.Questions.push({
      Question: "Type of Property",
      Answer: data.propertyPickerOptions[data.typeOfProperty]
    });
    requestBody.Questions.push({
      Question: "What is the exact location of the vehicle?",
      Answer: data.abandonedAddress
    });
    requestBody.Questions.push({
      Question: "Plate Number",
      Answer: data.plateNumber
    });
  } else if (data.typeOfProblem === 2) {
    //TODO: this type is also not allowed to be anonymous
    requestBody.CaseType = "REP_ANIMALCOMPLAINT";
    // no extra questions, so Questions stays as []
  } else if (data.typeOfProblem === 3) {
    //TODO: this type is also not allowed to be anonymous
    requestBody.CaseType = "REP_DMGDTREE";
    requestBody.Questions.push({
      Question: "Is tree blocking street access and/or right of way?",
      Answer: data.treeBlockingStreet
    });
    requestBody.Questions.push({
      Question: "Please describe the exact location of the tree.",
      Answer: data.treeAddress
    });
    requestBody.Questions.push({
      Question: "Size of branch?",
      Answer: data.treePickerOptions[data.typeOfBranch]
    });
  } else if (data.typeOfProblem === 4) {
    requestBody.CaseType = "REP_GRAFFITI";
    requestBody.Questions.push({
      Question: "Type of Property",
      Answer: data.graffitiPropertyPickerOptions[data.graffitiPropertyType]
    });
    requestBody.Questions.push({
      Question: "Is graffiti above the first floor?",
      Answer: data.graffitiPickerOptions[data.graffitiFirstFloor]
    });
    requestBody.Questions.push({
      Question: "Is graffiti profane or racist?",
      Answer: data.graffitiPickerOptions[data.graffitiProfane]
    });
  } else if (data.typeOfProblem === 5) {
    requestBody.CaseType = "REQ_ILLEGALPARKING";
    requestBody.Questions.push({
      Question: "What is the exact location of the vehicle?",
      Answer: data.illegalParkingAddress
    });
    requestBody.Questions.push({
      Question: "Plate Number",
      Answer: data.illegalPlateNumber
    });
    requestBody.Questions.push({
      Question: "Type of Property",
      Answer: data.propertyPickerOptions[data.illegalParkingProperty]
    });
  } else if (data.typeOfProblem === 6) {
    requestBody.CaseType = "REP_NEIGHBOR";
    // no extra questions, so Questions stays as []
  } else if (data.typeOfProblem === 7) {
    requestBody.CaseType = "REP_POTHOLE";
    requestBody.Questions.push({
      Question: "Where is the pothole located?",
      Answer: data.pothole1PickerOptions[data.pothole1Val]
    });
    requestBody.Questions.push({
      Question: "What is the pothole surface?",
      Answer: data.pothole2PickerOptions[data.pothole2Val]
    });
    requestBody.Questions.push({
      Question: "Direction of travel",
      Answer: data.pothole3PickerOptions[data.pothole3Val]
    });
    requestBody.Questions.push({
      Question: "Which Lane?",
      Answer: data.pothole4PickerOptions[data.pothole4Val]
    });
    requestBody.Questions.push({
      Question: "Describe the damage",
      Answer: data.pothole5PickerOptions[data.pothole5Val]
    });
    requestBody.Questions.push({
      Question: "Can you see the bottom?",
      Answer: data.pothole6PickerOptions[data.pothole6Val]
    });
  } else if (data.typeOfProblem === 8) {
    requestBody.CaseType = "REQ_SNOWREMOVAL";
    // no extra questions, so Questions stays as []
  } else if (data.typeOfProblem === 9) {
    requestBody.CaseType = "REQ_SNOWSTREET";
    // no extra questions, so Questions stays as []
  } else if (data.typeOfProblem === 10) {
    //TODO: this type is also not allowed to be anonymous
    requestBody.CaseType = "REP_MISSEDTRASH";
    requestBody.Questions.push({
      Question: "What is the issue?",
      Answer: data.trash1PickerOptions[data.trash1Val]
    });
    requestBody.Questions.push({
      Question: "What type of service?",
      Answer: data.trash2PickerOptions[data.trash2Val]
    });
    requestBody.Questions.push({
      Question: "If missed, please provide exact location of items now.",
      Answer: data.missedTrashLocation
    });
    requestBody.Questions.push({
      Question: "If damaged, what type of damage?",
      Answer: data.trash3PickerOptions[data.trash3Val]
    });
    requestBody.Questions.push({
      Question: "Are you requesting a replacement of a stolen cart?",
      Answer: data.trash4PickerOptions[data.trash4Val]
    });
    requestBody.Questions.push({
      Question: "What is the size of the cart?",
      Answer: data.trash5PickerOptions[data.trash5Val]
    });
    requestBody.Questions.push({
      Question: "What is the color of the cart?",
      Answer: data.trash6PickerOptions[data.trash6Val]
    });
  } else if (data.typeOfProblem === 11) {
    //TODO: this type is also not allowed to be anonymous
    requestBody.CaseType = "REQ_OTHER";
    // no extra questions, so Questions stays as []
  }

  // requestBody.Comments += '   \n\n\n******* sent via iOS mobile app *******';

  let postResp;

  //submits the form
  try {
    let post = await fetch('https://www.denvergov.org/api/AskDenver/Cases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        requestBody
      )
    });
    console.log(post);
    postResp = post;

    if (post.status === 201 && CONFIG.AIRTABLE_ZAP) {
      //adds to Airtable
      try {
        let post = await fetch(CONFIG.AIRTABLE_ZAP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            requestBody
          )
        });
        // return post;
      } catch(error) {
        throw('Could not load stop departures', error);
      }

      //pings me in Slack
      try {
        let post = await fetch(CONFIG.SLACK_ZAP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            requestBody
          )
        });
        // return post;
      } catch(error) {
        throw('Could not load stop departures', error);
      }
    }
    // return post;
  } catch(error) {
    throw('Could not load stop departures', error);
  }

  dispatch(ApiActions.updateResponse({ response: postResp }));
}
