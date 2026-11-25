package com.smartLeave.campus.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LeaveRequestDTO {
    private String reason;
    private LocalDate fromDate;
    private LocalDate toDate;
}