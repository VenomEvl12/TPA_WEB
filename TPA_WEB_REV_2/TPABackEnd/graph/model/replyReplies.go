package model

type ReplyReplies struct {
	ReplyRepliesID string `json:"replyRepliesID"`
	ReplyID        string `json:"replyID"`
	UserID         string `json:"user"`
	Like           int    `json:"like"`
	Dislike        int    `json:"dislike"`
	Day            *int    `json:"day"`
	Month          *int    `json:"month"`
	Year           *int    `json:"year"`
	Description    string `json:"description"`
}