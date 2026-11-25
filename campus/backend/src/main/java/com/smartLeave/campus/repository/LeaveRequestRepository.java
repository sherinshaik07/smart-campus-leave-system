package com.smartLeave.campus.repository;

import com.smartLeave.campus.model.LeaveRequest;
import com.smartLeave.campus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStudent(User student);
    List<LeaveRequest> findByStatus(String status);
}