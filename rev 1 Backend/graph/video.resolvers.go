package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateVideo(ctx context.Context, input *model.NewVideo) (*bool, error) {
	num := 0
	failed := false
	success := true

	var video = model.Video{
		VideoID:      "",
		UserID:       "",
		Title:        input.Title,
		Views:        &num,
		Day:          input.Day,
		Month:        input.Month,
		Year:         input.Year,
		Like:         &num,
		Dislike:      &num,
		Descriptions: input.Descriptions,
		SourceLink:   input.SourceLink,
		Category:     input.Category,
		VideoLength:  input.VideoLength,
		Restriction:  input.Restriction,
		Premium:      input.Premium,
	}

	_, err := r.DB.Model(video).Insert()

	if err != nil {
		return &failed, errors.New("failed to insert")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateViews(ctx context.Context, videoID string, views *int) (*bool, error) {
	var video *model.Video
	failed := false
	success := true

	err := r.DB.Model(&video).Where("videoID = ?", videoID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	video.Views = views

	_, updateErr := r.DB.Model(&video).Where("videoID = ?", videoID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateLike(ctx context.Context, videoID string, like *int) (*bool, error) {
	var video *model.Video
	failed := false
	success := true

	err := r.DB.Model(&video).Where("videoID = ?", videoID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	video.Like = like

	_, updateErr := r.DB.Model(&video).Where("videoID = ?", videoID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateDislike(ctx context.Context, videoID string, dislike *int) (*bool, error) {
	var video *model.Video
	failed := false
	success := true

	err := r.DB.Model(&video).Where("videoID = ?", videoID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	video.Dislike = dislike

	_, updateErr := r.DB.Model(&video).Where("videoID = ?", videoID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateDescription(ctx context.Context, videoID string, descriptions *string) (*bool, error) {
	var video *model.Video
	failed := false
	success := true

	err := r.DB.Model(&video).Where("videoID = ?", videoID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	video.Descriptions = descriptions

	_, updateErr := r.DB.Model(&video).Where("videoID = ?", videoID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateRestriction(ctx context.Context, videoID string, restriction *bool) (*bool, error) {
	var video *model.Video
	failed := false
	success := true

	err := r.DB.Model(&video).Where("videoID = ?", videoID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	video.Restriction = restriction

	_, updateErr := r.DB.Model(&video).Where("videoID = ?", videoID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdatePremiumVideo(ctx context.Context, videoID string, premium *bool) (*bool, error) {
	var video *model.Video
	failed := false
	success := true

	err := r.DB.Model(&video).Where("videoID = ?", videoID).Select()
	if err != nil {
		return &failed, errors.New("no video")
	}

	video.Premium = premium

	_, updateErr := r.DB.Model(&video).Where("videoID = ?", videoID).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) RemoveVideo(ctx context.Context, videoID string) (*bool, error) {
	var video model.Video
	success := true
	failed := false

	err := r.DB.Model(video).Where("videoID = ?", videoID).First()

	if err != nil {
		return &failed, errors.New("video is not on list")
	}

	_, deleteVideo := r.DB.Model(&video).Where("videoID = ?", videoID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this vid")
	}

	return &success, nil
}

func (r *queryResolver) Videos(ctx context.Context, videoID string) (*model.Video, error) {
	var video *model.Video

	err := r.DB.Model(&video).Where("videoID = ?", videoID).First()

	if err != nil { return nil, errors.New("failed to get video")}

	return video, nil
}

func (r *queryResolver) ListVideos(ctx context.Context) ([]*model.Video, error) {
	var videos []*model.Video

	err := r.DB.Model(&videos).Select()

	if err != nil { return nil, errors.New("failed to get videos")}

	return videos, nil


}
