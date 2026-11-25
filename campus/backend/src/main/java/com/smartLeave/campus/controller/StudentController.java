package com.smartLeave.campus.controller;

import com.smartLeave.campus.dto.LeaveRequestDTO;
import com.smartLeave.campus.model.LeaveRequest;
import com.smartLeave.campus.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping("/leave")
    public LeaveRequest createLeave(@RequestBody LeaveRequestDTO dto, Authentication auth) {
        return leaveService.createLeave(auth.getName(), dto);
    }

    @GetMapping("/leaves")
    public List<LeaveRequest> getMyLeaves(Authentication auth) {
        return leaveService.getMyLeaves(auth.getName());
    }
}