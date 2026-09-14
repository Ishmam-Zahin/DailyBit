package dailybit_judge.system.judge.enums;

public enum SubmissionStatus {
    QUEUED,
    RUNNING,
    COMPILING,
    FINISHED,
    ACCEPTED,
    WRONG_ANSWER,
    COMPILATION_ERROR,
    RUNTIME_ERROR,
    SERVER_ERROR,
    TIME_LIMIT_EXCEEDED,
    MEMORY_LIMIT_EXCEEDED,
}
