package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateUserSubscribe(ctx context.Context, input *model.NewUserSubscribe) (*model.UserSubscribe, error) {
	var userSubs model.UserSubscribe

	gErr := r.DB.Model(&userSubs).Where("user_id = ? AND channel_id = ?", input.UserID, input.ChannelID).Select()

	if gErr == nil {
		return &userSubs, nil
	}

	userSubs = model.UserSubscribe{
		UserID:        input.UserID,
		ChannelID:     input.ChannelID,
		Subscribe:     false,
		ChannelUserID: input.ChannelUserID,
	}

	_, err := r.DB.Model(&userSubs).Insert()
	if err != nil {
		return nil, errors.New("failed to insert")
	}

	return &userSubs, nil
}

func (r *mutationResolver) UpdateUserSubscribe(ctx context.Context, userID string, channelID string) (*model.UserSubscribe, error) {
	var userSubs model.UserSubscribe

	err := r.DB.Model(&userSubs).Where("user_id = ? AND channel_id = ?", userID, channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve subs")
	}

	if userSubs.Subscribe == true {
		userSubs.Subscribe = false
	} else {
		userSubs.Subscribe = true
	}

	_, uErr := r.DB.Model(&userSubs).Where("user_id = ? AND channel_id = ?", userID, channelID).Update()

	if uErr != nil {
		return nil, errors.New("failed to update userSubscribe")
	}

	return &userSubs, nil
}

func (r *mutationResolver) DeleteUserSubscribe(ctx context.Context, userID string, channelID string) (*bool, error) {
	var userSubs model.UserSubscribe
	success := true
	failed := false

	err := r.DB.Model(userSubs).Where("user_id = ?, channel_id = ?", userID, channelID).Select()

	if err != nil {
		return &failed, errors.New("userSubs is not on list")
	}

	_, deleteSubs := r.DB.Model(&userSubs).Where("user_id = ?, channel_id = ?", userID, channelID).Delete()

	if deleteSubs != nil {
		return &failed, errors.New("cannot delete this userSubs")
	}

	return &success, nil
}

func (r *queryResolver) UserSubscribes(ctx context.Context, userID string) ([]*model.UserSubscribe, error) {
	var userSubscribe []*model.UserSubscribe

	err := r.DB.Model(&userSubscribe).Where("user_id = ?", userID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve userSubs")
	}

	return userSubscribe, nil
}

func (r *queryResolver) ChannelSubscribe(ctx context.Context, channelID string) (*model.UserSubscribe, error) {
	var userSubscribe model.UserSubscribe

	err := r.DB.Model(&userSubscribe).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve userSubs")
	}

	return &userSubscribe, nil
}

func (r *queryResolver) GetChannelSubscribe(ctx context.Context, userID string) ([]*model.UserSubscribe, error) {
	var channelSubs []*model.UserSubscribe

	err := r.DB.Model(&channelSubs).Where("user_id = ? AND subscribe = TRUE", userID).Select()

	if err != nil {
		return nil, errors.New("no subs found")
	}

	return channelSubs, nil
}
