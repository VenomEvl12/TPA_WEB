package model

type ChannelCommunity struct {
	CommunityID    string  `json:"communityID"`
	ChannelID      string  `json:"channelID"`
	UserID         string   `json:"user"`
	ComDescription string `json:"comDescription"`
	Like           int    `json:"like"`
	Dislike        int    `json:"dislike"`
	Day            int    `json:"day"`
	Month          int    `json:"month"`
	Year           int    `json:"year"`
}
