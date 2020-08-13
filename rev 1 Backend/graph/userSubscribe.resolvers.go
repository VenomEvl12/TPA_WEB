package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateUserSubscribe(ctx context.Context, input *model.NewUserSubscribe) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteUserSubscribe(ctx context.Context, userID string, channelID string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) UserSubscribes(ctx context.Context) ([]*model.UserSubscribe, error) {
	panic(fmt.Errorf("not implemented"))
}
