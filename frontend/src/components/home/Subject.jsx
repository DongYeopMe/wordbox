const Subject =({id,title,quantity,onClick}) =>{
    return(
        <div className="card" onClick={onClick}>
                <span>{title}</span>
                <span>{quantity}</span>
        </div>
    )
}
export default Subject;