package com.smartLeave.campus.controller;

import com.smartLeave.campus.dto.RejectRequest;
import com.smartLeave.campus.model.LeaveRequest;
import com.smartLeave.campus.repository.LeaveRequestRepository;
import com.smartLeave.campus.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    @Autowired private LeaveService leaveService;
    @Autowired private LeaveRequestRepository leaveRepo;

    @GetMapping("/pending")
    public List<LeaveRequest> getPending() {
        return leaveRepo.findByStatus("PENDING");
    }
    @GetMapping("/history")
public List<LeaveRequest> getHistory() {
    return leaveRepo.findAll(); // returns all leaves, filter in frontend
}

    @PutMapping("/approve/{id}")
    public LeaveRequest approve(@PathVariable Long id) {
        return leaveService.mentorApprove(id);
    }
    @PutMapping("/reject/{id}")
public LeaveRequest reject(@PathVariable Long id, @RequestBody RejectRequest request) {
    return leaveService.rejectLeave(id, request.getReason());
}
}