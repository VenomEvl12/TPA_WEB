package model

type Channel struct {
	ChannelID          string   `json:"channelID"`
	UserID             string   `json:"userID"`
	ViewCount          int      `json:"viewCount"`
	Location           string   `json:"location"`
	ChannelDescription string   `json:"channelDescription"`
	ChannelImage       string   `json:"channelImage"`
	ChannelBanner      string   `json:"channelBanner"`
}