package dailybit_judge.system.judge.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController ()
public class JudgeController {

    @GetMapping (path = "/")
    public ResponseEntity<?> greet(){
        return ResponseEntity.ok("server running");
    }
}
