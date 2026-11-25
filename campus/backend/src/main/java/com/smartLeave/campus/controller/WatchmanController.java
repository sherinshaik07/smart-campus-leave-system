package com.smartLeave.campus.controller;

import com.smartLeave.campus.dto.ScanRequest;
import com.smartLeave.campus.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchman")
public class WatchmanController {

    @Autowired private LeaveService leaveService;

    @PostMapping("/scan")
    public String scan(@RequestBody ScanRequest request) {
        return leaveService.scanQR(request.getToken());
    }
}