package com.smartLeave.campus.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.Transient;


@Entity
@Table(name = "leave_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    private String reason;

    private LocalDate fromDate;
    private LocalDate toDate;

    // PENDING, MENTOR_APPROVED, APPROVED, REJECTED
    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime exitTime;
    private String rejectionReason;
    @Transient
private String otp;
}