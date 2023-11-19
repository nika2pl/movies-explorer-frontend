import "./Alert.css";

const Alert = ({alert}) => {
    let isDisplayClass;
    const {type, message, isDisplay} = alert;

    if (isDisplay) {
        isDisplayClass = 'show';
    } else {
        isDisplayClass = 'hide';
    }

    return (
        <div className={"alert alert-" + type + ' alert-' + isDisplayClass}>{message}</div>
    )
}

export default Alert;