import Countdown from "react-countdown";

const StatusBar = props => {
    const {message, isEnded, handleTimerCompletion, timerKey, initialDate} = props;
    return (
        <div className=" pb-3 grid place-items-center font-bold dark:text-white text-lg">
            {isEnded ? message : <Countdown date={initialDate} onComplete={handleTimerCompletion} key={timerKey}/>}
        </div>
    );
};

export default StatusBar;
