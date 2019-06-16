import React from 'react';
import FolderButton from './FolderButton';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import PlayIcon from '@material-ui/icons/PlayArrow';
import ReactAudioPlayer from 'react-audio-player';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../App.css';

var Sound = require('react-sound').default;

class AudioTab extends React.Component{
    constructor() {
            super();
            this.handleChange = this.handleChange.bind(this);
            this.handleAnalyze = this.handleAnalyze.bind(this);
            this.state = {
                audio_set : false,
                emotion: "none",
            }
    }

    handleChange(e){
        var file = e.target.files[0]
        console.log(file.name)
        // reader.readAsDataURL(file)
        // reader.readAsText(file);
        const data = new FormData()
        data.append('file', file)
        // reader.readAsBinaryString(file)
        // console.log(data)
        axios.post('http://localhost:8000/upload/', data, {}).then(
            res=>{
                console.log(res.data)
                this.setState({path:res.data["dir"], audio_set: true});
            }
        )
        /*
        reader.onload = () => {
            console.log("sending...")

            //console.log(reader.result)
        };
        */
    }

    handleAnalyze(){
        axios.post('http://localhost:8000/analyse/', {"path":this.state.path}).then(
            res=>{
                console.log(res.data)
                this.setState({emotion:res.data["emotion"]})
            }
        )
    }

    render(){
        return(
            <div>
                <div>
                    <input type="file" ref={(ref) => this.upload = ref} /*accept='.wav'*/ onChange={ (e) => this.handleChange(e)} style={{ display: 'none' }} />
                    <div onClick={(e) => this.upload.click() }>
                    <FolderButton />
                     </div>
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
            </div>
        )

    }
}
export default AudioTab;
