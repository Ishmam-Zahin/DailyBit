package dailybit_judge.system.judge.exceptions;

public class TimeLimitExceededException extends RuntimeException {
    public TimeLimitExceededException(String message) {
        super(message);
    }
}