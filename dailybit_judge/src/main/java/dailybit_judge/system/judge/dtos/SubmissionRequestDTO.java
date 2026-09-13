package dailybit_judge.system.judge.dtos;

import dailybit_judge.system.judge.enums.Language;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor 
@AllArgsConstructor
@Data 
public class SubmissionRequestDTO {
    @Positive
    @NotBlank
    private Long problemId = null;

    @NotBlank
    @NotNull
    private Language Language;

    @NotBlank
    @NotNull
    @Size (min = 5)
    private String code;
}
