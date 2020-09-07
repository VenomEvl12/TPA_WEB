package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateChannelCommunityVali(ctx context.Context, input *model.NewchannelCommunityVali) (*model.ChannelCommunityVali, error) {
	var channelComVal model.ChannelCommunityVali

	gErr := r.DB.Model(&channelComVal).Where("user_id = ? AND community_id = ?", input.UserID, input.CommunityID).Select()

	if gErr == nil {
		return &channelComVal, nil
	}

	channelComVal = model.ChannelCommunityVali{
		UserID:      input.UserID,
		CommunityID: input.CommunityID,
		Like:        false,
		Dislike:     false,
	}

	_, err := r.DB.Model(&channelComVal).Insert()

	if err != nil {
		return nil, errors.New("failed insert commVali")
	}

	return &channelComVal, nil
}

func (r *mutationResolver) UpdateChannelCommunityValiLike(ctx context.Context, communityValiID string) (*model.ChannelCommunityVali, error) {
	var comVal model.ChannelCommunityVali

	err := r.DB.Model(&comVal).Where("community_vali_id = ?", communityValiID).Select()

	if err != nil {
		return nil, errors.New("failed to communityLikeVal")
	}

	if comVal.Like == false {
		comVal.Like = true
	} else {
		comVal.Like = false
	}

	_, updateErr := r.DB.Model(&comVal).Where("community_vali_id = ?", communityValiID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update likes")
	}

	return &comVal, nil
}

func (r *mutationResolver) UpdateChannelCommunityValiDislike(ctx context.Context, communityValiID string) (*model.ChannelCommunityVali, error) {
	var comVal model.ChannelCommunityVali

	err := r.DB.Model(&comVal).Where("community_vali_id = ?", communityValiID).Select()

	if err != nil {
		return nil, errors.New("failed to communityLikeVal")
	}

	if comVal.Dislike == false {
		comVal.Dislike = true
	} else {
		comVal.Dislike = false
	}

	_, updateErr := r.DB.Model(&comVal).Where("community_vali_id = ?", communityValiID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update likes")
	}

	return &comVal, nil
}

func (r *mutationResolver) DeleteChannelCommunityVali(ctx context.Context, communityID string) (*bool, error) {
	var comVal model.ChannelCommunityVali
	success := true
	failed := false

	err := r.DB.Model(&comVal).Where("community_vali_id = ?", communityID).Select()

	if err != nil {
		return &failed, errors.New("communityVal is not on list")
	}

	_, deleteVideo := r.DB.Model(&comVal).Where("community_vali_id = ?", communityID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this communityVal")
	}

	return &success, nil
}

func (r *queryResolver) ChannelCommunityVali(ctx context.Context, communityValiID string, communityID string, userID string) (*model.ChannelCommunityVali, error) {
	var comVal model.ChannelCommunityVali

	err := r.DB.Model(&comVal).Where("community_vali_id = ?, community_id = ?, user_id = ?", communityValiID, communityID, userID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve comVal")
	}

	return &comVal, nil
}
