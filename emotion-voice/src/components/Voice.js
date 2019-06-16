import { ReactMic } from 'react-mic';
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';


export class Voice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      display:false,
      data: {
        labels: ['Angry', 'Sad', 'Passion', 'Fear', 'Neutral'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 0
        }]
        }
    }

  }

  postRequest(){
      axios.post('http://localhost:8000/analyse/', {"name":"frank"}).then(
          res=>{
              console.log(res.data)
          }
      )
  }

  startRecording = () => {
    this.setState({
      record: true,
      display:false
    });
  }

  stopRecording = () => {
    this.setState({
      record: false,
      display:true
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
      const data = new FormData()

      var blob = new Blob(["Hello, world!"], { type: 'text/plain' });
      var blobUrl = URL.createObjectURL(blob);

      console.log(blobUrl)

      blobUrl = data['blobURL']
      var xhr = new XMLHttpRequest;
      xhr.responseType = 'blob';

      xhr.onload = function() {
           var recoveredBlob = xhr.response;

           var reader = new FileReader;

           reader.onload = function() {
             var blobAsDataUrl = reader.result;
             window.location = blobAsDataUrl;
           };

           reader.readAsDataURL(recoveredBlob);
           console.log(reader)

           axios.post('http://localhost:8000/record/', reader, {
               headers: {
                   'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                 },}).then(
               res=>{
                   console.log(res.data)
                   //this.setState({path:res.data["dir"], audio_set: true});
               }
           )
      };

      xhr.open('GET', blobUrl);
      console.log("send")
      xhr.send();


    //console.log('recordedBlob is: ', recordedBlob);
  }

  render() {


    return (
      <div>

      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#f50057"
           />
         </Grid>
         <Grid
             container
             direction="row"
             justify="center"
             alignItems="center"
           >
                <Button onClick={this.startRecording} outlined disabled={this.state.record} color="secondary">Start</Button>
                <Button onClick={this.stopRecording} disabled={!this.state.record} color="secondary" type="button">Stop</Button>
        </Grid>

        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >

          {this.state.display&&
               <Doughnut
                 data={this.state.data}
                 />
           }
       </Grid>

       <Grid
           container
           direction="row"
           justify="center"
           alignItems="center"
       >
       </Grid>
      </div>
    );
  }
}

export default Voice;
