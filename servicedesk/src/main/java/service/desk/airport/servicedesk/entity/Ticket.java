package service.desk.airport.servicedesk.entity;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketStatus;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "code",unique = true, columnDefinition = "VARCHAR(60)")
    private String code;

    @Column(name = "title", columnDefinition = "VARCHAR(60)")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name="status")
    TicketStatus status;

    @Column(name="priority")
    PriorityLevel priorityLevel;

    @Column(name="category")
    Category category;

    @Column(name = "tag")
    private TicketTag tag;

    @Column(name="date")
    private LocalDateTime date;


    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    public Ticket() {
    }

    public Ticket(Integer id, String code, String title, String description, TicketStatus status, PriorityLevel priorityLevel, Category category, TicketTag tag, LocalDateTime date, User createdBy, User assignedTo) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priorityLevel = priorityLevel;
        this.category = category;
        this.tag = tag;
        this.date = date;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
    }

    public Ticket(String code, String title, String description, TicketStatus status, PriorityLevel priorityLevel, Category category, TicketTag tag, LocalDateTime date, User createdBy) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priorityLevel = priorityLevel;
        this.category = category;
        this.tag = tag;
        this.date = date;
        this.createdBy = createdBy;
    }

    public Ticket(String code, String title, String description, TicketStatus status, PriorityLevel priorityLevel, Category category, TicketTag tag, LocalDateTime date, User createdBy, User assignedTo) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priorityLevel = priorityLevel;
        this.category = category;
        this.tag = tag;
        this.date = date;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public PriorityLevel getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(PriorityLevel priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public TicketTag getTag() {
        return tag;
    }

    public void setTag(TicketTag tag) {
        this.tag = tag;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }
}
