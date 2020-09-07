package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/generated"
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *channelCommunityResolver) User(ctx context.Context, obj *model.ChannelCommunity) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", obj.UserID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve user")
	}

	return &user, nil
}

func (r *mutationResolver) CreateChannelCommunities(ctx context.Context, input model.NewChannelCommunity) (*model.ChannelCommunity, error) {
	var channelComm = model.ChannelCommunity{
		ChannelID:      input.ChannelID,
		UserID:         input.UserID,
		ComDescription: input.ComDescription,
		Like:           0,
		Dislike:        0,
		Day:            input.Day,
		Month:          input.Month,
		Year:           input.Year,
	}

	_, err := r.DB.Model(&channelComm).Insert()

	if err != nil {
		return nil, errors.New("failed to insert channelComm")
	}

	return &channelComm, nil
}

func (r *mutationResolver) UpdateChannelCommunitiesLike(ctx context.Context, communityID string, like bool) (*model.ChannelCommunity, error) {
	var channelComm model.ChannelCommunity

	err := r.DB.Model(&channelComm).Where("community_id = ?", communityID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve communityReply")
	}

	if like == true {
		channelComm.Like += 1
	} else {
		channelComm.Like -= 1
	}

	_, updateErr := r.DB.Model(&channelComm).Where("community_id = ?", communityID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update likes")
	}

	return &channelComm, nil
}

func (r *mutationResolver) UpdateChannelCommunitiesDislike(ctx context.Context, communityID string, dislike bool) (*model.ChannelCommunity, error) {
	var channelComm model.ChannelCommunity

	err := r.DB.Model(&channelComm).Where("community_id = ?", communityID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve communityReply")
	}

	if dislike == true {
		channelComm.Dislike += 1
	} else {
		channelComm.Dislike -= 1
	}

	_, updateErr := r.DB.Model(&channelComm).Where("community_id = ?", communityID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update dislikes")
	}

	return &channelComm, nil
}

func (r *mutationResolver) DeleteChannelCommunities(ctx context.Context, communityID string) (bool, error) {
	var community model.ChannelCommunity
	success := true
	failed := false

	err := r.DB.Model(&community).Where("community_id = ?", communityID).Select()

	if err != nil {
		return failed, errors.New("community is not on list")
	}

	_, deleteVideo := r.DB.Model(&community).Where("community_id = ?", communityID).Delete()

	if deleteVideo != nil {
		return failed, errors.New("cannot delete this community")
	}

	return success, nil
}

func (r *queryResolver) ChannelCommunities(ctx context.Context, channelID string) ([]*model.ChannelCommunity, error) {
	var community []*model.ChannelCommunity

	err := r.DB.Model(&community).Where("channel_id = ?", channelID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve community")
	}

	return community, nil
}

func (r *queryResolver) ChannelCommunity(ctx context.Context, communityID string) (*model.ChannelCommunity, error) {
	var community model.ChannelCommunity

	err := r.DB.Model(&community).Where("community_id = ?", communityID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve community")
	}

	return &community, nil
}

// ChannelCommunity returns generated.ChannelCommunityResolver implementation.
func (r *Resolver) ChannelCommunity() generated.ChannelCommunityResolver {
	return &channelCommunityResolver{r}
}

type channelCommunityResolver struct{ *Resolver }
