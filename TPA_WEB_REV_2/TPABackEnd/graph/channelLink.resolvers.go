package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
)

func (r *mutationResolver) CreateChannelLink(ctx context.Context, input model.NewChannelLink) (*model.ChannelLink, error) {
	channelLink := model.ChannelLink{
		UserID: input.UserID,
		Link:   input.Link,
	}

	_, err := r.DB.Model(&channelLink).Insert()

	if err != nil {
		return nil, err
	}

	return &channelLink, nil
}

func (r *mutationResolver) UpdateChannelLink(ctx context.Context, channelLinkID string, userID string, link string) (*model.ChannelLink, error) {
	var channelLink model.ChannelLink

	err := r.DB.Model(&channelLink).Where("channel_link_id = ? AND user_id = ?", channelLinkID, userID).Select()

	if err != nil {
		return nil, err
	}

	channelLink.Link = link

	_, uErr := r.DB.Model(&channelLink).Where("channel_link_id = ? AND user_id = ?", channelLinkID, userID).Update()

	if uErr != nil {
		return nil, uErr
	}

	return &channelLink, nil
}

func (r *mutationResolver) DeleteChannelLink(ctx context.Context, channelLinkID string, userID string) (bool, error) {
	var channelLink model.ChannelLink

	err := r.DB.Model(&channelLink).Where("channel_link_id = ? AND user_id = ?", channelLinkID, userID).Select()

	if err != nil {
		return false, err
	}

	_, dErr := r.DB.Model(&channelLink).Where("channel_link_id = ? AND user_id = ?", channelLinkID, userID).Delete()

	if dErr != nil {
		return false, dErr
	}

	return true, nil
}

func (r *mutationResolver) DeleteAllChannelLink(ctx context.Context, userID string) (bool, error) {
	var channelLink []*model.ChannelLink

	err := r.DB.Model(&channelLink).Where("user_id = ?", userID).Select()

	if err != nil {
		return false, err
	}

	_, dErr := r.DB.Model(&channelLink).Where("user_id = ?", userID).Delete()

	if dErr != nil {
		return false, dErr
	}

	return true, nil
}

func (r *queryResolver) RetrieveLinks(ctx context.Context, userID string) ([]*model.ChannelLink, error) {
	var channelLinks []*model.ChannelLink

	err := r.DB.Model(&channelLinks).Where("user_id = ?", userID).Select()

	if err != nil {
		return nil, err
	}

	return channelLinks, nil
}
