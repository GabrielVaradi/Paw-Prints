import React, { Component } from 'react';
import { Form, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import PetMap from './PetMap.js';
import { Redirect } from 'react-router-dom';
import marker from './marker.png';
import paw from './paw.png';


import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField, Grid, Button } from '@material-ui/core/';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


class ReportAPet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfile: false,

      id: '',
      name: '',
      species: '',
      status: '',
      date_lost: '',
      picture: null,
      picture_merged: null,
      current_user: '',
      errors: [],
      breed: '',
      colour: '',
      sex: '',
      additional: '',

      street_number: '',
      street_name: '',
      apartment: '',
      city: '',
      province: '',
      postal_code: '',
      latitude: this.props.userLocation.lat,
      longitude: this.props.userLocation.lng,

      mapPosition: {
				lat: this.props.userLocation.lat,
				lng: this.props.userLocation.lng
			},
			markerPosition: {
				lat: this.props.userLocation.lat,
				lng: this.props.userLocation.lng
			}

    };
  }

  setPictureState = picture => {
    this.setState({
      picture: picture
    });
    console.log(this.state.picture);
  };

  fileSelectedHandler = event => {
    this.setState({
      picture: event.target.files[0]
    });
    this.resize(event.target.files[0])
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
}


  updateParentState = (data) => {
    if (data.markerPosition){
    this.setState({
      latitude: data.markerPosition.lat,
      longitude: data.markerPosition.lng,
      ...data
    });
  } else {
    this.setState({...data})
  }
  }

  sendToDB = (picture) => {
    var date = new Date(this.state.date_lost).getTime();
    axios
    .post('http://localhost:3001/api/pets', {
      description: {
        breed: this.state.breed,
        colour: this.state.colour,
        sex: this.state.sex,
        additional: this.state.additional
      },
      address: {
        street_number: this.state.street_number,
        street_name: this.state.street_name,
        city: this.state.city,
        province: this.state.province,
        postal_code: this.state.postal_code,
      },
      pet: {
        name: this.state.name,
        species: this.state.species,
        status: this.state.status,
        date_lost: date,
        picture: this.state.picture,
        picture_merged: this.state.picture_merged,
        user_id: this.state.current_user.id,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
    })
    .then(response => {
      this.props.addAPet(response.data);
      this.setState({
        id: response.data.id,
        redirectToProfile: true,
      });
      //Push Notification
      if(response){
        axios.post('/api/notification',
          {message: `A ${this.state.species} was ${this.state.status} in your area.`,
          image: (this.state.picture? this.state.picture: null),
          URL: `http:localhost/pets${response.data.id}`});
        }
      })
    .catch(err => {
      console.log('report pet error: ', err.response.data);
      this.setState({
          errors: err.response.data
        })
    });

}


resize = picture => {

    const reader = new FileReader();
    reader.onload = e => {
      const canvas = document.createElement('canvas')
      canvas.height = 128
      canvas.width = 128
      const ctx = canvas.getContext('2d')
      const img = document.createElement('img')
      img.src = e.target.result
      img.onload = () => {

        ctx.drawImage(img, 32, 16, 64, 64)
        ctx.drawImage(this.imgMarker, 0, 0, 128, 128)
        ctx.drawImage(this.imgPaw, 50, 84, 28, 28)

        canvas.toBlob((blob) => this.setState({picture_merged: blob}))
      }
    }
    reader.readAsDataURL(picture);

  }


  handleSubmit = event => {
    event.preventDefault();
    const originalPicture = this.state.picture;

    if (!originalPicture && this.state.species === "Dog") {
      this.setState({
        picture: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/dog.jpg?alt=media&token=3bf752ef-a6b5-44b7-bb73-6e067f5e0bca",
        picture_merged: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/dog.jpg?alt=media&token=3bf752ef-a6b5-44b7-bb73-6e067f5e0bca"
      }, () => this.sendToDB())
    }
    else if (!originalPicture && this.state.species === "Cat") {
       this.setState({
        picture: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/cat.png?alt=media&token=defd9f60-3f31-4864-a7d1-6d488972705d",
        picture_merged: "https://firebasestorage.googleapis.com/v0/b/final-project-1561040119727.appspot.com/o/cat.png?alt=media&token=defd9f60-3f31-4864-a7d1-6d488972705d"
      }, () => this.sendToDB())
    }
    else if (originalPicture && this.state.species) {
    const storageRef = this.state.storage.ref();
    const that = this;

          const uploadPicture = storageRef.child(this.state.picture.name).put(originalPicture);
          const uploadPictureMerged = storageRef.child(`Marker${this.state.picture.name}`).put(this.state.picture_merged);
          const picturePromise = new Promise((resolve, reject) => {
            uploadPicture.on(
              'state_changed',
              function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              function(error) {
                console.log(error);
              },
              function() {
                uploadPicture.snapshot.ref.getDownloadURL().then(downloadURL => {
                  console.log(downloadURL);
                  that.setState({
                      picture: downloadURL
                    },
                    () => {

                      resolve();
                    })
                });
              });
          })
          const pictureMergedPromise = new Promise((resolve, reject) => {
            uploadPictureMerged.on(
              'state_changed',
              function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              function(error) {
                console.log(error);
              },
              function() {
                uploadPictureMerged.snapshot.ref.getDownloadURL().then(downloadURL => {
                  console.log(downloadURL);
                  that.setState({
                      picture_merged: downloadURL
                    },
                    () => {

                      resolve();
                    })
                });
              });
          })
          Promise.all([picturePromise, pictureMergedPromise]).then(() => this.sendToDB())

} else {
  this.sendToDB()
}
  };

  componentDidMount() {
    console.log(this.props)
    this.setState({
      storage: window.firebase.storage(),
      current_user: this.props.current_user,
    });
    this.imgMarker = new Image()
    this.imgMarker.src = marker
    this.imgPaw = new Image()
    this.imgPaw.src = paw
  }

  render() {
      const { errors } = this.state;
    if (this.state.redirectToProfile === true) {
      return <Redirect to={`/pets/${this.state.id}`} />;
    } else {
      return (
        <React.Fragment>
        <div className="report-a-pet">
          <h2 className="login-title">Report a lost, found or spotted pet</h2>
          <Form onSubmit={this.handleSubmit} autoComplete="off">

            <FormControl required className="status">
              <InputLabel name="status" margin="normal" htmlFor="status-native-helper">Status</InputLabel>
                <NativeSelect
                  name="status"
                  value={this.state.age}
                  onChange={this.handleChange}
                  input={<Input name="age" id="age-native-helper" />}
                >
                  <option value="" />
                  <option>Lost</option>
                  <option>Found</option>
                  <option>Spotted</option>
                </NativeSelect>
            </FormControl>

            <div className="name">
                <Grid item>
                  <TextField name="name" margin="normal" onChange={this.handleChange} label="Enter Pet's name" required/>
                </Grid>
            </div>

            <FormControl required className="species">
              <InputLabel name="species" margin="normal" htmlFor="species-native-helper">Species</InputLabel>
                <NativeSelect
                  name="species"
                  value={this.state.species}
                  onChange={this.handleChange}
                  input={<Input name="species" id="species-native-helper" />}
                >
                  <option value="" />
                  <option>Cat</option>
                  <option>Dog</option>
                </NativeSelect>
            </FormControl>

            <div className="breed">
                <Grid item>
                  <TextField name="breed" margin="normal" onChange={this.handleChange} label="Breed" required/>
                </Grid>
            </div>

            <FormControl className="sex">
              <InputLabel name="sex"  margin="normal" htmlFor="sex-native-helper">Sex</InputLabel>
                <NativeSelect
                  name="sex"
                  value={this.state.sex}
                  onChange={this.handleChange}
                  input={<Input name="sex" id="sex-native-helper" />}
                >
                  <option value="" />
                  <option>Male</option>
                  <option>Female</option>
                </NativeSelect>
            </FormControl>

            <FormControl required className="colour">
              <InputLabel name="colour" margin="normal" htmlFor="colour-native-helper">Colour</InputLabel>
                <NativeSelect
                  name="colour"
                  value={this.state.colour}
                  onChange={this.handleChange}
                  input={<Input name="colour" id="colour-native-helper" />}
                >
                  <option value="" />
                  <option>Black</option>
                  <option>White</option>
                  <option>Grey</option>
                  <option>Orange</option>
                  <option>Brown</option>
                  <option>Beige</option>
                  <option>Multicoloured</option>
                </NativeSelect>
            </FormControl>

            <div className="date_lost">
                <Grid item>
                  <TextField name="date_lost" margin="normal" onChange={this.handleChange} label="Date Lost/Spotted/Found" required/>
                </Grid>
            </div>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid} justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="mui-pickers-date"
          label="Date picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

             <TextField
                id="outlined-multiline-static"
                label="Additional"
                multiline
                fullWidth
                rows="4"
                className="additional"
                name="additional"
                value={this.state.additional}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />

            <div>
              <input
                type='file'
                name='picture'
                onChange={this.fileSelectedHandler}
              />
            </div>

           
              <PetMap
                updateParentState={this.updateParentState}
                parentState={this.state}
                google={this.props.google}
                center={{ lat: this.props.userLocation.lat, lng: this.props.userLocation.lng }}
                height='300px'
                width='100%'
                zoom={15}
                userLocation={this.props.userLocation}
              />

            <Button type="submit" variant="contained" color="primary" className="login-button">
              Submit
            </Button>
          </Form>
        </div>
      </React.Fragment>
      );
    }
  }
}

export default ReportAPet;
