
function Button({btnID, btnClass, btnName, disabled, onClick, index}) {
    return (
        <button 
            id={btnID}
            index={index}
            className={btnClass} 
            disabled={disabled} 
            onClick={onClick}
        >
            {btnName}
        </button>
    )
}

export default Button;