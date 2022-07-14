import Countdown from "react-countdown";

const countDownRenderer = ({minutes, seconds}) => {
    let style = "";
    if (minutes === 0 && seconds < 30){
        style = " text-rose-600"
    }
    return (
        <span className={style}>
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </span>
    );

}

const StatusBar = props => {
    const {message, isEnded, handleTimerCompletion, timerKey, initialDate} = props;
    return (
        <div className=" pb-3 grid place-items-center font-bold dark:text-white text-lg">
            {isEnded ? (message ? message : <div className="h-7"/>) : <Countdown date={initialDate} onComplete={handleTimerCompletion} key={timerKey} renderer={countDownRenderer}/>}
        </div>
    );
};

export default StatusBar;
