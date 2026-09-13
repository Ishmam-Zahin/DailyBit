package dailybit_judge.system.judge.services;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingDeque;

import org.springframework.stereotype.Service;

import dailybit_judge.system.judge.models.Submission;
import jakarta.annotation.PostConstruct;

@Service 
public class JudgeService {
    private final static int workersCount = 10;
    private final BlockingQueue<Submission> works = new LinkedBlockingDeque<>();
    private ExecutorService workers;
    
    @PostConstruct
    private void startWorkers(){
        this.workers = Executors.newFixedThreadPool(workersCount);
    }
}
