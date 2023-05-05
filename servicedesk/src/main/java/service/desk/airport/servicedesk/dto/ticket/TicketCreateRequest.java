package service.desk.airport.servicedesk.dto.ticket;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketStatus;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

public class TicketCreateRequest {

    private String title;

    private String description;

    private String priorityLevel;

    private String category;

    private String tag;

    private Integer userId;

    public TicketCreateRequest(String title, String description, String priorityLevel, String category, String tag, Integer userId) {
        this.title = title;
        this.description = description;
        this.priorityLevel = priorityLevel;
        this.category = category;
        this.tag = tag;
        this.userId = userId;
    }

    public TicketCreateRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(String priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
