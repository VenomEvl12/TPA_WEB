package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateNewVideoReplyLikeVali(ctx context.Context, input model.NewVideoReplyLikeVali) (*model.VideoReplyLikeVali, error) {
	var replyLikeVal model.VideoReplyLikeVali

	gErr := r.DB.Model(&replyLikeVal).Where("user_id = ? AND video_id = ? AND reply_id = ?", input.UserID, input.VideoID, input.ReplyID).Select()

	if gErr == nil {
		return &replyLikeVal, nil
	}

	replyLikeVal = model.VideoReplyLikeVali{
		UserID:  input.UserID,
		VideoID: input.VideoID,
		ReplyID: input.ReplyID,
		Like:    false,
		Dislike: false,
	}

	_, err := r.DB.Model(&replyLikeVal).Insert()

	if err != nil {
		return nil, errors.New("failed insert replyLikeVali")
	}

	return &replyLikeVal, nil
}

func (r *mutationResolver) UpdateVideoReplyLikeVali(ctx context.Context, userID string, videoID string, replyID string) (*model.VideoReplyLikeVali, error) {
	var replyLikeVal model.VideoReplyLikeVali

	err := r.DB.Model(&replyLikeVal).Where("user_id = ? AND video_id = ? AND reply_id = ?", userID, videoID, replyID).Select()

	if err != nil {
		return nil, errors.New("failed to update reply like val")
	}

	if replyLikeVal.Like == true {
		replyLikeVal.Like = false
	} else {
		replyLikeVal.Like = true
	}

	_, updateErr := r.DB.Model(&replyLikeVal).Where("user_id = ? AND video_id = ? AND reply_id = ?", userID, videoID, replyID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update reply like val")
	}

	return &replyLikeVal, nil
}

func (r *mutationResolver) UpdateVideoReplyDislikeVali(ctx context.Context, userID string, videoID string, replyID *string) (*model.VideoReplyLikeVali, error) {
	var replyLikeVal model.VideoReplyLikeVali

	err := r.DB.Model(&replyLikeVal).Where("user_id = ? AND video_id = ? AND reply_id = ?", userID, videoID, replyID).Select()

	if err != nil {
		return nil, errors.New("failed to update reply like val")
	}

	if replyLikeVal.Dislike == true {
		replyLikeVal.Dislike = false
	} else {
		replyLikeVal.Dislike = true
	}

	_, updateErr := r.DB.Model(&replyLikeVal).Where("user_id = ? AND video_id = ? AND reply_id = ?", userID, videoID, replyID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update reply like val")
	}

	return &replyLikeVal, nil
}

func (r *mutationResolver) DeleteVideoReplyLikeVali(ctx context.Context, videoID string, replyID string) (*bool, error) {
	var replyLikeVal *model.VideoReplyLikeVali
	success := true
	failed := false

	err := r.DB.Model(&replyLikeVal).Where("video_id = ? AND reply_id = ?", videoID, replyID).Select()

	if err != nil {
		return &failed, errors.New("reply is not on list")
	}

	_, deleteVideo := r.DB.Model(&replyLikeVal).Where("video_id = ? AND reply_id = ?", videoID, replyID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this replyVal")
	}

	return &success, nil
}

func (r *queryResolver) VideoReplyLikeVali(ctx context.Context, userID string, videoID string, replyID string) (*model.VideoReplyLikeVali, error) {
	var replyLikeVal model.VideoReplyLikeVali

	err := r.DB.Model(&replyLikeVal).Where("video_id = ? AND user_id = ? AND reply_id = ?", videoID, userID, replyID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve replyLikeVal")
	}

	return &replyLikeVal, nil
}
