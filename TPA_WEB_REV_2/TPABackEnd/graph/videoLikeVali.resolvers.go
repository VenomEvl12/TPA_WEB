package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateVideoLikeVali(ctx context.Context, input *model.NewVideoLikeVali) (*model.VideoLikeVali, error) {
	var likeVal model.VideoLikeVali

	qErr := r.DB.Model(&likeVal).Where("video_id = ? AND user_id = ?", input.VideoID, input.UserID).Select()

	if qErr == nil {
		return &likeVal, nil
	}

	var videoLikeVal = model.VideoLikeVali{
		UserID:  input.UserID,
		VideoID: input.VideoID,
		Like:    false,
		Dislike: false,
	}

	_, err := r.DB.Model(&videoLikeVal).Insert()

	if err != nil {
		return nil, errors.New("failed insert videoLikeVal")
	}

	return &likeVal, nil
}

func (r *mutationResolver) UpdateVideoLikeVali(ctx context.Context, videoID string, userID string) (*model.VideoLikeVali, error) {
	var videoLikeVal model.VideoLikeVali

	err := r.DB.Model(&videoLikeVal).Where("video_id = ? AND user_id = ?", videoID, userID).Select()

	if err != nil {
		return nil, errors.New("failed to update video like val")
	}

	if videoLikeVal.Like == false {
		videoLikeVal.Like = true
	} else {
		videoLikeVal.Like = false
	}

	_, updateErr := r.DB.Model(&videoLikeVal).Where("video_id = ? AND user_id = ?", videoID, userID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update video like val")
	}

	return &videoLikeVal, nil
}

func (r *mutationResolver) UpdateVideoDislikeVali(ctx context.Context, videoID string, userID string) (*model.VideoLikeVali, error) {
	var videoLikeVal model.VideoLikeVali

	err := r.DB.Model(&videoLikeVal).Where("video_id = ? AND user_id = ?", videoID, userID).Select()

	if err != nil {
		return nil, errors.New("failed to update video like val")
	}

	if videoLikeVal.Dislike == false {
		videoLikeVal.Dislike = true
	} else {
		videoLikeVal.Dislike = false
	}

	_, updateErr := r.DB.Model(&videoLikeVal).Where("video_id = ? AND user_id = ?", videoID, userID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update video like val")
	}

	return &videoLikeVal, nil
}

func (r *mutationResolver) DeleteVideoLikeVali(ctx context.Context, videoID string) (*bool, error) {
	var videoLikeVal *model.VideoLikeVali
	success := true
	failed := false

	err := r.DB.Model(&videoLikeVal).Where("video_id = ?", videoID).Select()

	if err != nil {
		return &failed, errors.New("video is not on list")
	}

	_, deleteVideo := r.DB.Model(&videoLikeVal).Where("video_id = ?", videoID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this videoList")
	}

	return &success, nil
}

func (r *queryResolver) VideoLikeVali(ctx context.Context, userID string, videoID string) (*model.VideoLikeVali, error) {
	var videoLikeVali model.VideoLikeVali

	err := r.DB.Model(&videoLikeVali).Where("user_id = ?, video_id = ?", userID, videoID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve videoLikeVal")
	}

	return &videoLikeVali, nil
}
