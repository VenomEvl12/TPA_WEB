package model
type Video struct {
	VideoID      string  `json:"videoID"`
	UserID       string   `json:"userID"`
	Title        *string `json:"title"`
	Thumbnail    *string `json:"thumbnail"`
	Views        *int    `json:"views"`
	Day          *int    `json:"day"`
	Month        *int    `json:"month"`
	Year         *int    `json:"year"`
	Like         *int    `json:"like"`
	Dislike      *int    `json:"dislike"`
	Descriptions *string `json:"descriptions"`
	SourceLink   *string `json:"sourceLink"`
	Category     *string `json:"category"`
	VideoLength  *int    `json:"videoLength"`
	Location     *string `json:"location"`
	Restriction  *bool   `json:"restriction"`
	TypePub      bool	 `json:"typePub"`
	Premium      *bool   `json:"premium"`
}
