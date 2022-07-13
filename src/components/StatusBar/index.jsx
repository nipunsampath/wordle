const Settings = props => {
    const {win, lost, message,gameState} = props;

    return (
        <div className=" grid place-items-center h-8 font-bold dark:text-white">
            {lost || win ? message : ""}
            {/*{gameState.toString()}*/}
        </div>
)
    ;
};

export default Settings;
