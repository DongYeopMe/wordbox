const Button = ({text,type,onClick}) =>{
    return (
        <button onClick={onClick} className={`Button_${type}`}>{text}</button>
    )
}
export default Button;