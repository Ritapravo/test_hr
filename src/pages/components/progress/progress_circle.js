import {React} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { textAlign } from '@mui/system';



const Progress_circle = (props) => {
  const progress_style = {
    gridRowStart: '1', 
    gridColumnStart: '1',
    width:'100%',
    textAlign:'center',
    backgroundColor: '#f3efef',
    opacity:'0.4',
    padding: props.padding? props.padding: '12% 0 0 0',
    margin: props.margin? props.margin :'-15px 0px 0px -15px',
    borderRadius: '20px',
    zIndex:'2',
  }
  return (
    <div style={progress_style}>
        <CircularProgress styles={{opacity:'1'}}/>
    </div>
  )
}

export default Progress_circle;