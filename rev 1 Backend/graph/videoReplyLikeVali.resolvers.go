package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateNewVideoReplyLikeVali(ctx context.Context, input model.NewVideoReplyLikeVali) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateVideoReplyLikeVali(ctx context.Context, userID string, videoID string, replyID string, like *bool) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateVideoReplyDislikeVali(ctx context.Context, userID string, videoID string, replyID string, dislike *bool) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteVideoReplyLikeVali(ctx context.Context, videoID string, replyID string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) VideoReplyLikeVali(ctx context.Context) (*model.VideoReplyLikeVali, error) {
	panic(fmt.Errorf("not implemented"))
}
