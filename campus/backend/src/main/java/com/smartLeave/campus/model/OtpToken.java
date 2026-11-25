package com.smartLeave.campus.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otp_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String otp;

    @OneToOne
    @JoinColumn(name = "leave_request_id")
    private LeaveRequest leaveRequest;

    private LocalDateTime expiryTime;

    private boolean isUsed = false;
}