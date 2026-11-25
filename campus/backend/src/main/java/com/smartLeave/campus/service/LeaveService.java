package com.smartLeave.campus.service;

import com.smartLeave.campus.dto.LeaveRequestDTO;
import com.smartLeave.campus.model.*;
import com.smartLeave.campus.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeaveService {

    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private OtpTokenRepository otpRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private EmailService emailService;

    // Student creates leave request
    public LeaveRequest createLeave(String email, LeaveRequestDTO dto) {
        User student = userRepo.findByEmail(email).orElseThrow();
        LeaveRequest leave = new LeaveRequest();
        leave.setStudent(student);
        leave.setReason(dto.getReason());
        leave.setFromDate(dto.getFromDate());
        leave.setToDate(dto.getToDate());
        leave.setStatus("PENDING");
        leave.setCreatedAt(LocalDateTime.now());
        return leaveRepo.save(leave);
    }

   public List<LeaveRequest> getMyLeaves(String email) {
    User student = userRepo.findByEmail(email).orElseThrow();
    List<LeaveRequest> leaves = leaveRepo.findByStudent(student);

    // Attach OTP for approved leaves
    for (LeaveRequest leave : leaves) {
        if ("APPROVED".equals(leave.getStatus())) {
            otpRepo.findAll().stream()
                .filter(o -> o.getLeaveRequest().getId().equals(leave.getId()))
                .findFirst()
                .ifPresent(o -> leave.setOtp(o.getOtp()));
        }
    }
    return leaves;
}

    // Mentor approves - NO email (HOD sees it on dashboard)
    public LeaveRequest mentorApprove(Long id) {
        LeaveRequest leave = leaveRepo.findById(id).orElseThrow();
        leave.setStatus("MENTOR_APPROVED");
        return leaveRepo.save(leave);
    }

    // HOD approves - sends OTP email ONLY if student has a real email
    public OtpToken hodApprove(Long id) {
        LeaveRequest leave = leaveRepo.findById(id).orElseThrow();
        leave.setStatus("APPROVED");
        leaveRepo.save(leave);

        // Generate 6-digit OTP
        String otp = String.format("%06d", (int)(Math.random() * 1000000));

        OtpToken otpToken = new OtpToken();
        otpToken.setOtp(otp);
        otpToken.setLeaveRequest(leave);
        otpToken.setExpiryTime(LocalDateTime.now().plusHours(2));
        otpToken.setUsed(false);
        otpRepo.save(otpToken);

        // Send email ONLY if student email is NOT a demo (@college.edu) address
        // Send email ONLY if student email is NOT a demo address
if (!leave.getStudent().isDemo()) {
    emailService.sendEmail(
        leave.getStudent().getEmail(),
        "Leave Approved - Your Exit OTP",
        "Your leave is approved.\n\nOTP: " + otp +
        "\n\nShow this OTP to the Watchman for exit. Valid for 2 hours."
    );
    System.out.println("Email sent to: " + leave.getStudent().getEmail());
} else {
    System.out.println("Demo account - OTP shown on screen only: " + otp);
}

        return otpToken;
    }

    public LeaveRequest rejectLeave(Long id, String reason) {
    LeaveRequest leave = leaveRepo.findById(id).orElseThrow();
    leave.setStatus("REJECTED");
    leave.setRejectionReason(reason);
    return leaveRepo.save(leave);
}

    // Watchman verifies OTP
    @Transactional
    public String scanQR(String otpInput) {
        OtpToken otp = otpRepo.findByOtp(otpInput)
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (otp.isUsed()) throw new RuntimeException("OTP already used");
        if (otp.getExpiryTime().isBefore(LocalDateTime.now()))
            throw new RuntimeException("OTP expired");

        otp.setUsed(true);
        otpRepo.save(otp);

        LeaveRequest leave = otp.getLeaveRequest();
        leave.setExitTime(LocalDateTime.now());
        leaveRepo.save(leave);

        return "Exit Recorded Successfully"+leave.getStudent().getName()+" at "+leave.getExitTime();
    }
}