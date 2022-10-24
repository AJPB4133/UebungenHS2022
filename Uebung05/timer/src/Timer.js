import { Button, Grid, TextField } from "@mui/material";
import React, {Component} from "react";


class Timer extends Component{
    constructor(props){
        super(props);

        this.state = {count: this.props.countdown, msg: "", render:true};
        this.interval = null;

        this.update = this.update.bind(this);
        this.start_timer = this.start_timer.bind(this);
        this.buttonclicked = this.buttonclicked.bind(this);


    }

    buttonclicked(event){
        const sek = event.target.value;
        this.setState({count: sek})
    }

    update(event){
        this.setState({count: this.state.count -1});
        if (this.state.count <= 1){
            this.setState({count:"", msg: "FERTIG", render:true});
            this.setState({coount: ""});
            clearInterval(this.interval);
            this.interval = null;

        }
    }

    start_timer(event){
        this.setState({msg: "", render: false});
        
        if (this.interval != null){
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.update, 1000);
    }



    render(){
        return(
            <>
            {this.state.render &&
            <Grid container>
                <Grid style={{margin:20}}>
                    <TextField  inputProps={{type: "number"}} value={this.state.countdown}  onChange={this.buttonclicked} label = "Sekunden"/>
                </Grid>
            </Grid>
            }
            <p>{this.state.count}</p>
            <p>{this.state.msg}</p>
            <Button onClick={this.start_timer}>Start</Button>
            
            </>
        )
    }
}

export default Timer;
