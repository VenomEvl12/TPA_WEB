package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateChannel(ctx context.Context, input *model.NewChannel) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateChannelView(ctx context.Context, channelID string, viewCount *int) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateChannelLocation(ctx context.Context, channelID string, location *string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateChannelDescription(ctx context.Context, channelID string, description *string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateChannelImage(ctx context.Context, channelID string, channelImage *string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) GetChannel(ctx context.Context, userID string) (*model.Channel, error) {
	panic(fmt.Errorf("not implemented"))
}
