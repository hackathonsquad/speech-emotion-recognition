import { ReactMic } from 'react-mic';
import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import * as blobUtil from 'blob-util'
import PlayIcon from '@material-ui/icons/PlayArrow';
import ReactAudioPlayer from 'react-audio-player';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

export class Voice extends React.Component {
  constructor(props) {
    super(props);
    this.onStop = this.onStop.bind(this)
    this.handleAnalyze = this.handleAnalyze.bind(this);
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
        }],
        audio_set : true,
        emotion: "none",
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

  handleAnalyze(){
      axios.post('http://localhost:8000/analyse/', {"path":this.state.path}).then(
          res=>{
              console.log(res.data)
              this.setState({emotion:res.data["emotion"]})
          }
      )
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

  setValue(val){
      this.setState(val)
  }

  onStop(recordedBlob) {
        // const bloburl = recordedBlob.blobURL
        console.log("sending data...")
        console.log(recordedBlob)

        var xhr = new XMLHttpRequest();
        xhr.open('GET', recordedBlob.blobURL, true);
        xhr.responseType = 'blob';
        const scope = this
        xhr.onload = function(e) {
          if (this.status == 200) {
            var myBlob = this.response;
            let blobData = new FormData();
            blobData.append('file', myBlob);

            axios.post('http://localhost:8000/record/', blobData, {}).then(
                res=>{
                    console.log(res.data)
                    scope.setState({path:res.data["dir"], audio_set: true})
                })
          }
        };
        xhr.send();
        console.log("sended data...")
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


       {this.state.audio_set &&
           <div>

                 <div onClick = {() => {this.handleAnalyze()}}>
                     <div style={{textAlign:"center", margin:"20px"}}>
                       <Fab  aria-label="Delete" >
                         <PlayIcon />
                       </Fab>
                      </div>
                      <audio ref={(audio) => { this.audio = audio; }}
                      src="src/components/test.wav">
                      </audio>
                 </div>



   <div>
     <Grid container spacing={3}>
       <Grid item xs={12}  style = {{
           textAlign: 'center',
         }}>
         <Paper  style={{
             backgroundColor:(this.state.emotion=="happy")?"#f50057":"grey",
             color:(this.state.emotion=="happy")?"white":"black",
         }}>Happy</Paper>
       </Grid>
       <Grid item xs={12} style = {{
           textAlign: 'center',
         }}>
         <Paper  style={{
             backgroundColor:(this.state.emotion=="sad")?"#f50057":"grey",
             color:(this.state.emotion=="sad")?"white":"black",
         }}>Sad</Paper>
       </Grid>
       <Grid item xs={12} style = {{
           textAlign: 'center',
         }}>
         <Paper  style={{
             backgroundColor:(this.state.emotion=="neutral")?"#f50057":"grey",
             color:(this.state.emotion=="neutral")?"white":"black",
         }}>Neutral</Paper>
       </Grid>
       <Grid item xs={12} style = {{
           textAlign: 'center',
         }}>
         <Paper  style={{
             backgroundColor:(this.state.emotion=="fear")?"#f50057":"grey",
             color:(this.state.emotion=="fear")?"white":"black",
         }}>Fear</Paper>
       </Grid>
       <Grid item xs={12} style = {{
           textAlign: 'center',
         }}>
         <Paper  style={{
             backgroundColor:(this.state.emotion=="angry")?"#f50057":"grey",
             color:(this.state.emotion=="angry")?"white":"black",
         }}>Angry</Paper>
       </Grid>

     </Grid>
   </div>
</div>

}
      </div>
    );
  }
}

export default Voice;
