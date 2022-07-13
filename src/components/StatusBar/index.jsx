import Countdown from "react-countdown";

const StatusBar = props => {
    const {message, isEnded, handleTimerCompletion, timerKey, initialDate} = props;
    return (
        <div className=" grid place-items-center h-8 font-bold dark:text-white">
            {isEnded ? message : <Countdown date={initialDate} onComplete={handleTimerCompletion} key={timerKey}/>}
        </div>
    );
};

export default StatusBar;
