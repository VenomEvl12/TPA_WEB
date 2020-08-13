package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateNewVideoReplyRepliesLikeVali(ctx context.Context, input *model.NewVideoReplyRepliesLikeVali) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateVideReplyRepliesLikeVali(ctx context.Context, videoReplyRepliesLikeValiID string, like *bool) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateVideoReplyRepliesDislikeVali(ctx context.Context, videoReplyRepliesLikeValiID string, dislike *bool) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteVideoReplyRepliesLikeVali(ctx context.Context, videoReplyRepliesLikeValiID string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) VideoReplyRepliesLikeVali(ctx context.Context, videoReplyRepliesLikeValiID string) (*model.VideoReplyLikeVali, error) {
	panic(fmt.Errorf("not implemented"))
}
