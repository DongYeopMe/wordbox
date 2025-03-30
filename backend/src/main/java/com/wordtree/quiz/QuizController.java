package com.wordtree.quiz;

import com.wordtree.global.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.wordtree.global.ResultCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("quiz")
public class QuizController {
    private final QuizService quizService;

    @GetMapping("/getWord")
    public ResponseEntity<Object> getQuizOne(@RequestBody QuizGetRequest quizGetRequest){
        QuizGetResponse response = quizService.getQuiz(quizGetRequest);
        return ResponseEntity.ok(ResultResponse.of(QUIZ_GET_SUCCESS,true));
    }
}
