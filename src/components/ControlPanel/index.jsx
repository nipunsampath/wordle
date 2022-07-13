import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

const ControlPanel = props => {
    const {reInitializeGame, showAnswer} = props;
    return (
        <div className=" grid grid-cols-2 py-5 px-20 gap-x-5">
                <Button variant="contained" onClick={showAnswer} endIcon={<SearchIcon/>}>Show Answer</Button>
                <Button variant="contained" onClick={reInitializeGame} endIcon={<SendIcon/>}>Next Word</Button>
        </div>
    );
};

export default ControlPanel;
