import "../styles/Quiz.css";

const Quiz = () =>{
    return (
        <div className="container">
            <div className="header">
                <div className="Today_Score">
                    <span>Today</span>
                    <span>24</span>
                </div>
                <div className="Today_Score">
                    <span>Success</span>
                    <span>20</span>
                </div>
                <div className="Today_Score">
                    <span>Wrong</span>
                    <span>4</span>
                </div>
            </div>
            <div className="problem_space">
                <div className="sentence_space">
                    <p>The ______ only exists in your head, Jane.</p>
                </div>
                <div className="hint_space">
                    <span>단어 뜻</span>
                </div>
            </div>
            <div className="view_space">
                <div className="choice_space"><span>단어</span></div>
                <div className="choice_space"><span>단어</span></div>
                <div className="choice_space"><span>단어</span></div>
                <div className="choice_space"><span>단어</span></div>
            </div>
        </div>
    );
}
export default Quiz;