package com.smartLeave.campus.controller;

import com.smartLeave.campus.dto.AdminStatsDTO;
import com.smartLeave.campus.model.LeaveRequest;
import com.smartLeave.campus.model.User;
import com.smartLeave.campus.repository.LeaveRequestRepository;
import com.smartLeave.campus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private LeaveRequestRepository leaveRepo;
    @Autowired private UserRepository userRepo;

    @GetMapping("/leaves")
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepo.findAll();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/stats")
    public AdminStatsDTO getStats() {
        List<LeaveRequest> all = leaveRepo.findAll();
        long total = all.size();
        long pending = all.stream().filter(l -> l.getStatus().equals("PENDING") || l.getStatus().equals("MENTOR_APPROVED")).count();
        long approved = all.stream().filter(l -> l.getStatus().equals("APPROVED")).count();
        long rejected = all.stream().filter(l -> l.getStatus().equals("REJECTED")).count();
        long exited = all.stream().filter(l -> l.getExitTime() != null).count();
        long students = userRepo.findAll().stream().filter(u -> u.getRole().name().equals("STUDENT")).count();

        return new AdminStatsDTO(total, pending, approved, rejected, exited, students);
    }
}