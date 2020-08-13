package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
	"fmt"
)

func (r *mutationResolver) CreateVideoReply(ctx context.Context, input *model.NewVideoReply) (*model.VideoReply, error) {

	reply := model.VideoReply{
		ReplyID:     "",
		UserID:      input.UserID,
		VideoID:     input.VideoID,
		Likes:       0,
		Day:         input.Day,
		Month:       input.Month,
		Year:        input.Year,
		Dislikes:    0,
		Description: input.Description,
	}

	_,err := r.DB.Model(reply).Insert()

	if err != nil { return nil, errors.New("failed to update") }

	return &reply, nil
}

func (r *mutationResolver) UpdateReplyLikes(ctx context.Context, replyID string, likes *int) (*bool, error) {
	var reply *model.Video
	failed := false
	success := true

	err := r.DB.Model(&reply).Where("replyID = ?", replyID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	reply.Like = likes

	_, updateErr := r.DB.Model(&reply).Where("replyID = ?", replyID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateReplyDislikes(ctx context.Context, replyID string, dislikes *int) (*bool, error) {
	var reply *model.Video
	failed := false
	success := true

	err := r.DB.Model(&reply).Where("replyID = ?", replyID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	reply.Dislike = dislikes

	_, updateErr := r.DB.Model(&reply).Where("replyID = ?", replyID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateReplyDescription(ctx context.Context, replyID string, description *string) (*bool, error) {
	var reply *model.Video
	failed := false
	success := true

	err := r.DB.Model(&reply).Where("replyID = ?", replyID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	reply.Descriptions = description

	_, updateErr := r.DB.Model(&reply).Where("replyID = ?", replyID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) DeleteReply(ctx context.Context, replyID string) (*bool, error) {
	var reply model.VideoReply
	success := true
	failed := false

	err := r.DB.Model(reply).Where("replyID = ?", replyID).First()

	if err != nil {
		return &failed, errors.New("reply is not on list")
	}

	_, deleteVideo := r.DB.Model(&reply).Where("replyID = ?", replyID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this reply")
	}

	return &success, nil
}

func (r *queryResolver) VideoReplies(ctx context.Context) ([]*model.VideoReply, error) {
	var videoReplies []*model.VideoReply

	err := r.DB.Model(&videoReplies).Select()

	if err != nil { return nil, errors.New("failed to retrieve reply")}

	return  videoReplies, nil
}

func (r *queryResolver) VideoReply(ctx context.Context, userID string, videoID string) (*model.VideoReply, error) {
	var videoReply *model.VideoReply

	err := r.DB.Model(&videoReply).Where("videoID = ?", videoID).First()

	if err != nil { return nil, errors.New("failed to retrieve reply")}

	return videoReply, nil
}
