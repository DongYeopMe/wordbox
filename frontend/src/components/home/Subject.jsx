const Subject =({id,title,quantity,onClick,language = "nomal"}) =>{
    return(
        <div className={`card ${language.toLowerCase()}`} onClick={onClick}>
                <span>{title}</span>
                <span>{quantity}</span>
        </div>
    )
}
export default Subject;