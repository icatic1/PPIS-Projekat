package service.desk.airport.servicedesk.dto.ticket;

import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.security.entity.User;

public class TicketFilterRequest {
    private Integer userId = null;

    private String filterType;

    private Category category;

    private PriorityLevel priorityLevel;

    private String sort;

    public TicketFilterRequest(Integer userId, String filterType, Category category, PriorityLevel priorityLevel, String sort) {
        this.userId = userId;
        this.filterType = filterType;
        this.category = category;
        this.priorityLevel = priorityLevel;
        this.sort = sort;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFilterType() {
        return filterType;
    }

    public void setFilterType(String filterType) {
        this.filterType = filterType;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public PriorityLevel getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(PriorityLevel priorityLevel) {
        this.priorityLevel = priorityLevel;
    }
}
