package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateChannelCommunities(ctx context.Context, input *model.NewChannelCommunity) (*model.ChannelCommunity, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) ChannelCommunities(ctx context.Context, channelID string) ([]*model.ChannelCommunity, error) {
	panic(fmt.Errorf("not implemented"))
}
