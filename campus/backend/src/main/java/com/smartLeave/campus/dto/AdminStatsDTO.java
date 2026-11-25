package com.smartLeave.campus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsDTO {
    private long totalLeaves;
    private long pending;
    private long approved;
    private long rejected;
    private long exited;
    private long totalStudents;
}