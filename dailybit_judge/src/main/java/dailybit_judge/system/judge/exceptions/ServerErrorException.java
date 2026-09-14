package dailybit_judge.system.judge.exceptions;

public class ServerErrorException extends RuntimeException {
    public ServerErrorException(String message) {
        super(message);
    }
    public ServerErrorException(String message, Throwable cause) {
        super(message, cause);
    }
}