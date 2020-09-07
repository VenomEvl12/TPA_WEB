package model

type VideoReply struct {
	ReplyID     string `json:"replyID"`
	UserID      string  `json:"user"`
	VideoID     string `json:"videoID"`
	Likes       int    `json:"likes"`
	Day         int    `json:"day"`
	Month       int    `json:"month"`
	Year        int    `json:"year"`
	Dislikes    int    `json:"dislikes"`
	Description string `json:"description"`
}