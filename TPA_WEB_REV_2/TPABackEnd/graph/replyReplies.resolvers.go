package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/generated"
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateReplyReplies(ctx context.Context, input model.NewReplyReplies) (*model.ReplyReplies, error) {
	number := 0

	var replyReply = model.ReplyReplies{
		ReplyID:     input.ReplyID,
		UserID:      input.UserID,
		Like:        number,
		Dislike:     number,
		Day:         input.Day,
		Month:       input.Month,
		Year:        input.Year,
		Description: input.Description,
	}

	_, err := r.DB.Model(&replyReply).Insert()

	if err != nil {
		return nil, errors.New("failed to insert replyReply")
	}

	return &replyReply, nil
}

func (r *mutationResolver) UpdateReplyRepliesLikes(ctx context.Context, replyRepliesID string, like bool) (*model.ReplyReplies, error) {
	var replyReply model.ReplyReplies

	err := r.DB.Model(&replyReply).Where("reply_replies_id = ?", replyRepliesID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve replyReplies")
	}

	if like == true {
		replyReply.Like += 1
	} else {
		replyReply.Like -= 1
	}

	_, updateErr := r.DB.Model(&replyReply).Where("reply_replies_id = ?", replyRepliesID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update likes")
	}

	return &replyReply, nil
}

func (r *mutationResolver) UpdateReplyRepliesDislikes(ctx context.Context, replyRepliesID string, dislike bool) (*model.ReplyReplies, error) {
	var replyReply model.ReplyReplies

	err := r.DB.Model(&replyReply).Where("reply_replies_id = ?", replyRepliesID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve replyReplies")
	}

	if dislike == true {
		replyReply.Dislike += 1
	} else {
		replyReply.Dislike -= 1
	}

	_, updateErr := r.DB.Model(&replyReply).Where("reply_replies_id = ?", replyRepliesID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update likes")
	}

	return &replyReply, nil
}

func (r *mutationResolver) DeleteReplyReplies(ctx context.Context, replyRepliesID string) (*bool, error) {
	var reply model.ReplyReplies
	success := true
	failed := false

	err := r.DB.Model(&reply).Where("reply_replies_id = ?", replyRepliesID).Select()

	if err != nil {
		return &failed, errors.New("video is not on list")
	}

	_, deleteVideo := r.DB.Model(&reply).Where("reply_replies_id = ?", replyRepliesID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this vid")
	}

	return &success, nil
}

func (r *queryResolver) ReplyReply(ctx context.Context, replyRepliesID string) (*model.ReplyReplies, error) {
	var replies model.ReplyReplies

	err := r.DB.Model(&replies).Where("reply_replies_id = ?", replyRepliesID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve data")
	}

	return &replies, nil
}

func (r *queryResolver) ListReplyReply(ctx context.Context, replyID string) ([]*model.ReplyReplies, error) {
	var replies []*model.ReplyReplies

	err := r.DB.Model(&replies).Where("reply_id = ?", replyID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve data")
	}

	return replies, nil
}

func (r *replyRepliesResolver) User(ctx context.Context, obj *model.ReplyReplies) (*model.User, error) {
	var user model.User
	err := r.DB.Model(&user).Where("id = ?", obj.UserID).Select()
	if err != nil {
		return nil, errors.New("failed")
	}
	return &user, nil
}

// ReplyReplies returns generated.ReplyRepliesResolver implementation.
func (r *Resolver) ReplyReplies() generated.ReplyRepliesResolver { return &replyRepliesResolver{r} }

type replyRepliesResolver struct{ *Resolver }
