package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateReplyReplies(ctx context.Context, input model.NewReplyReplies) (*model.ReplyReplies, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateReplyRepliesLikes(ctx context.Context, replyRepliesID string, like int) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateReplyRepliesDislikes(ctx context.Context, replyRepliesID string, dislike int) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteReplyReplies(ctx context.Context, replyRepliesID string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) ReplyReply(ctx context.Context, replyRepliesID string) (*model.ReplyReplies, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) ListReplyReply(ctx context.Context) ([]*model.ReplyReplies, error) {
	panic(fmt.Errorf("not implemented"))
}
