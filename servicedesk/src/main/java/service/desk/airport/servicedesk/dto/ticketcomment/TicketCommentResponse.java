package service.desk.airport.servicedesk.dto.ticketcomment;

import service.desk.airport.servicedesk.entity.TicketComment;
import service.desk.airport.servicedesk.security.dto.UserResponse;

public class TicketCommentResponse {
    private Integer id;
    private UserResponse createdBy;
    private String comment;
    private Integer ticketId;

    public TicketCommentResponse(TicketComment ticketComment) {
        this.id = ticketComment.getId();
        this.createdBy = new UserResponse(ticketComment.getCreatedBy());
        this.comment = ticketComment.getComment();
        this.ticketId = ticketComment.getTicket().getId();
    }
    public TicketCommentResponse() {
    }

    public TicketCommentResponse(Integer id, UserResponse createdBy, String comment, Integer ticketId) {
        this.id = id;
        this.createdBy = createdBy;
        this.comment = comment;
        this.ticketId = ticketId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserResponse getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserResponse createdBy) {
        this.createdBy = createdBy;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }
}
