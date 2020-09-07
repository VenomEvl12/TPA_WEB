package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateNewVideoReplyRepliesLikeVali(ctx context.Context, input *model.NewVideoReplyRepliesLikeVali) (*model.VideoReplyRepliesLikeVali, error) {
	var replyRepliesVal model.VideoReplyRepliesLikeVali

	gErr := r.DB.Model(&replyRepliesVal).Where("user_id = ? AND reply_id = ? AND video_id = ? AND reply_replies_id = ?", input.UserID, input.ReplyID, input.VideoID, input.ReplyRepliesID).Select()

	if gErr == nil {
		return &replyRepliesVal, nil
	}

	replyRepliesVal = model.VideoReplyRepliesLikeVali{
		UserID:         input.UserID,
		ReplyID:        input.ReplyID,
		VideoID:        input.VideoID,
		ReplyRepliesID: input.ReplyRepliesID,
		Like:           false,
		Dislike:        false,
	}

	_, err := r.DB.Model(&replyRepliesVal).Insert()

	if err != nil {
		return nil, errors.New("failed insert replyRepliesval")
	}

	return &replyRepliesVal, nil
}

func (r *mutationResolver) UpdateVideReplyRepliesLikeVali(ctx context.Context, videoReplyRepliesLikeValiID string, userID string, replyID string, videoID string, replyRepliesID string) (*model.VideoReplyRepliesLikeVali, error) {
	var replyRepliesVal model.VideoReplyRepliesLikeVali

	err := r.DB.Model(&replyRepliesVal).Where("video_reply_replies_like_vali_id = ? AND user_id = ? AND reply_id = ? AND video_id = ? AND reply_replies_id = ?", videoReplyRepliesLikeValiID, userID, replyID, videoID, replyRepliesID).Select()

	if err != nil {
		return nil, errors.New("failed to update replyReplies like val")
	}

	if replyRepliesVal.Like == true {
		replyRepliesVal.Like = false
	} else {
		replyRepliesVal.Like = true
	}

	_, updateErr := r.DB.Model(&replyRepliesVal).Where("video_reply_replies_like_vali_id = ? AND user_id = ? AND reply_id = ? AND video_id = ? AND reply_replies_id = ?", videoReplyRepliesLikeValiID, userID, replyID, videoID, replyRepliesID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update replyReplies like val")
	}

	return &replyRepliesVal, nil
}

func (r *mutationResolver) UpdateVideoReplyRepliesDislikeVali(ctx context.Context, videoReplyRepliesLikeValiID string, userID string, replyID string, videoID string, replyRepliesID string) (*model.VideoReplyRepliesLikeVali, error) {
	var replyRepliesVal model.VideoReplyRepliesLikeVali

	err := r.DB.Model(&replyRepliesVal).Where("video_reply_replies_like_vali_id = ? AND user_id = ? AND reply_id = ? AND video_id = ? AND reply_replies_id = ?", videoReplyRepliesLikeValiID, userID, replyID, videoID, replyRepliesID).Select()

	if err != nil {
		return nil, errors.New("failed to update replyReplies like val")
	}

	if replyRepliesVal.Dislike == true {
		replyRepliesVal.Dislike = false
	} else {
		replyRepliesVal.Dislike = true
	}

	_, updateErr := r.DB.Model(&replyRepliesVal).Where("video_reply_replies_like_vali_id = ? AND user_id = ? AND reply_id = ? AND video_id = ? AND reply_replies_id = ?", videoReplyRepliesLikeValiID, userID, replyID, videoID, replyRepliesID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update replyReplies like val")
	}

	return &replyRepliesVal, nil
}

func (r *mutationResolver) DeleteVideoReplyRepliesLikeVali(ctx context.Context, videoReplyRepliesLikeValiID string) (*bool, error) {
	var reply model.VideoReply
	success := true
	failed := false

	err := r.DB.Model(reply).Where("video_reply_replies_like_vali_id = ?", videoReplyRepliesLikeValiID).Select()

	if err != nil {
		return &failed, errors.New("reply is not on list")
	}

	_, deleteVideo := r.DB.Model(&reply).Where("video_reply_replies_like_vali_id = ?", videoReplyRepliesLikeValiID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this reply")
	}

	return &success, nil
}

func (r *mutationResolver) DeleteListVideoReplyReplyLikeVali(ctx context.Context, videoID string, replyID string) (*bool, error) {
	var reply model.VideoReply
	success := true
	failed := false

	err := r.DB.Model(reply).Where("video_id = ? AND reply_id = ?", videoID, replyID).Select()

	if err != nil {
		return &failed, errors.New("reply is not on list")
	}

	_, deleteVideo := r.DB.Model(&reply).Where("video_id = ? AND reply_id = ?", videoID, replyID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this reply")
	}

	return &success, nil
}

func (r *queryResolver) VideoReplyRepliesLikeVali(ctx context.Context, videoReplyRepliesLikeValiID string) (*model.VideoReplyRepliesLikeVali, error) {
	var replyRepliesVal model.VideoReplyRepliesLikeVali

	err := r.DB.Model(&replyRepliesVal).Where("video_reply_replies_like_vali_id = ?", videoReplyRepliesLikeValiID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve reply")
	}

	return &replyRepliesVal, nil
}
