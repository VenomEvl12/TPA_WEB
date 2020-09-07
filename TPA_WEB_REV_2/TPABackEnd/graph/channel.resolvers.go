package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/generated"
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *channelResolver) Videos(ctx context.Context, obj *model.Channel) ([]*model.Video, error) {
	var videos []*model.Video

	err := r.DB.Model(&videos).Where("user_id = ?", obj.UserID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve videos")
	}

	return videos, nil
}

func (r *mutationResolver) CreateChannel(ctx context.Context, input *model.NewChannel) (*model.Channel, error) {
	var channel model.Channel

	gErr := r.DB.Model(&channel).Where("user_id = ?", input.UserID).Select()

	if gErr == nil {
		return &channel, nil
	}

	channel = model.Channel{
		UserID:             input.UserID,
		ViewCount:          0,
		Location:           input.Location,
		ChannelDescription: "default",
		ChannelImage:       input.ChannelImage,
		ChannelBanner:      "https://firebasestorage.googleapis.com/v0/b/mowube.appspot.com/o/thumbnail%2Fbanner-default.jpg?alt=media&token=65c3b60b-77aa-44f4-8936-e239945ca80f",
	}

	_, err := r.DB.Model(&channel).Insert()

	if err != nil {
		return nil, errors.New("failed to created channel")
	}

	return &channel, nil
}

func (r *mutationResolver) UpdateChannelView(ctx context.Context, channelID string, viewCount int) (*model.Channel, error) {
	var channel model.Channel

	err := r.DB.Model(&channel).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve channel")
	}

	channel.ViewCount = viewCount

	_, updateErr := r.DB.Model(&channel).Where("channel_id = ?", channelID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return &channel, nil
}

func (r *mutationResolver) UpdateChannelLocation(ctx context.Context, channelID string, location string) (*model.Channel, error) {
	var channel model.Channel

	err := r.DB.Model(&channel).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve channel")
	}

	channel.Location = location

	_, updateErr := r.DB.Model(&channel).Where("channel_id = ?", channelID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return &channel, nil
}

func (r *mutationResolver) UpdateChannelDescription(ctx context.Context, channelID string, description string) (*model.Channel, error) {
	var channel model.Channel

	err := r.DB.Model(&channel).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve channel")
	}

	channel.ChannelDescription = description

	_, updateErr := r.DB.Model(&channel).Where("channel_id = ?", channelID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return &channel, nil
}

func (r *mutationResolver) UpdateChannelImage(ctx context.Context, channelID string, channelImage string) (*model.Channel, error) {
	var channel model.Channel

	err := r.DB.Model(&channel).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve channel")
	}

	channel.ChannelImage = channelImage

	_, updateErr := r.DB.Model(&channel).Where("channel_id = ?", channelID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return &channel, nil
}

func (r *mutationResolver) UpdateChannelBanner(ctx context.Context, channelID string, channelBanner string) (*model.Channel, error) {
	var channel model.Channel

	err := r.DB.Model(&channel).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve channel")
	}

	channel.ChannelBanner = channelBanner

	_, updateErr := r.DB.Model(&channel).Where("channel_id = ?", channelID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return &channel, nil
}

func (r *mutationResolver) DeleteChannel(ctx context.Context, channelID string) (*bool, error) {
	var channel model.Channel
	success := true
	failed := false

	err := r.DB.Model(&channel).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return &failed, errors.New("channel is not on list")
	}

	_, deleteVideo := r.DB.Model(&channel).Where("channel_id = ?", channelID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this channel")
	}

	return &success, nil
}

func (r *queryResolver) GetChannel(ctx context.Context, userID string) (*model.Channel, error) {
	var channel model.Channel

	err := r.DB.Model(&channel).Where("user_id = ?", userID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve channel")
	}

	return &channel, nil
}

func (r *queryResolver) GetChannelID(ctx context.Context, channelID string) (*model.Channel, error) {
	var channel model.Channel

	err := r.DB.Model(&channel).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve channel")
	}

	return &channel, nil
}

// Channel returns generated.ChannelResolver implementation.
func (r *Resolver) Channel() generated.ChannelResolver { return &channelResolver{r} }

type channelResolver struct{ *Resolver }
