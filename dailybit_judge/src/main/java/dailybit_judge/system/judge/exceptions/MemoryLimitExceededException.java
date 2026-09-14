package dailybit_judge.system.judge.exceptions;

public class MemoryLimitExceededException extends RuntimeException {
    public MemoryLimitExceededException(String message) {
        super(message);
    }
}