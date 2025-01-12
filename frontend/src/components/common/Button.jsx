const Button = ({text,type,name,onClick}) =>{
    return (
        <button onClick={onClick} type={type} className={`${name}_Btn`}>{text}</button>
    )
}
export default Button;