package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateVideoLikeVali(ctx context.Context, input *model.NewVideoLikeVali) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateVideoLikeVali(ctx context.Context, videoID string, userID string, like *bool) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateVideoDislikeVali(ctx context.Context, videoID string, userID string, dislike *bool) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) VideoLikeVali(ctx context.Context, userID string, videoID string) (*model.VideoLikeVali, error) {
	panic(fmt.Errorf("not implemented"))
}
