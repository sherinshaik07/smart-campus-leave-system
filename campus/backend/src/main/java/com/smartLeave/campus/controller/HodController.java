package com.smartLeave.campus.controller;

import com.smartLeave.campus.dto.RejectRequest;
import com.smartLeave.campus.model.LeaveRequest;
import com.smartLeave.campus.model.OtpToken;
import com.smartLeave.campus.repository.LeaveRequestRepository;
import com.smartLeave.campus.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hod")
public class HodController {

    @Autowired private LeaveService leaveService;
    @Autowired private LeaveRequestRepository leaveRepo;

    @GetMapping("/pending")
    public List<LeaveRequest> getPending() {
        return leaveRepo.findByStatus("MENTOR_APPROVED");
    }
    @GetMapping("/history")
public List<LeaveRequest> getHistory() {
    return leaveRepo.findAll();
}
    @PutMapping("/approve/{id}")
    public OtpToken approve(@PathVariable Long id) {
        return leaveService.hodApprove(id);
    }
    @PutMapping("/reject/{id}")
public LeaveRequest reject(@PathVariable Long id, @RequestBody RejectRequest request) {
    return leaveService.rejectLeave(id, request.getReason());
}
}