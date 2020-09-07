package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/generated"
	"TPABackEnd/graph/model"
	"context"
	"errors"
)

func (r *mutationResolver) CreateVideoReply(ctx context.Context, input model.NewVideoReply) (*model.VideoReply, error) {
	reply := model.VideoReply{
		UserID:      input.UserID,
		VideoID:     input.VideoID,
		Likes:       0,
		Day:         input.Day,
		Month:       input.Month,
		Year:        input.Year,
		Dislikes:    0,
		Description: input.Description,
	}

	_, err := r.DB.Model(&reply).Insert()

	if err != nil {
		return nil, errors.New("failed to update")
	}

	return &reply, nil
}

func (r *mutationResolver) UpdateReplyLikes(ctx context.Context, replyID string, like bool) (*model.VideoReply, error) {
	var reply model.VideoReply

	err := r.DB.Model(&reply).Where("reply_id = ?", replyID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	if like == true {
		reply.Likes += 1
	} else {
		reply.Likes -= 1
	}

	_, updateErr := r.DB.Model(&reply).Where("reply_id = ?", replyID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &reply, nil
}

func (r *mutationResolver) UpdateReplyDislikes(ctx context.Context, replyID string, dislike bool) (*model.VideoReply, error) {
	var reply model.VideoReply

	err := r.DB.Model(&reply).Where("reply_id = ?", replyID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	if dislike == true {
		reply.Dislikes += 1
	} else {
		reply.Dislikes -= 1
	}

	_, updateErr := r.DB.Model(&reply).Where("reply_id = ?", replyID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &reply, nil
}

func (r *mutationResolver) UpdateReplyDescription(ctx context.Context, replyID string, description string) (*model.VideoReply, error) {
	var reply model.VideoReply

	err := r.DB.Model(&reply).Where("reply_id = ?", replyID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	reply.Description = description

	_, updateErr := r.DB.Model(&reply).Where("reply_id = ?", replyID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &reply, nil
}

func (r *mutationResolver) DeleteReply(ctx context.Context, replyID string) (*bool, error) {
	var reply model.VideoReply
	success := true
	failed := false

	err := r.DB.Model(reply).Where("reply_id = ?", replyID).Select()

	if err != nil {
		return &failed, errors.New("reply is not on list")
	}

	_, deleteVideo := r.DB.Model(&reply).Where("reply_id = ?", replyID).Delete()

	if deleteVideo != nil {
		return &failed, errors.New("cannot delete this reply")
	}

	return &success, nil
}

func (r *queryResolver) VideoReplies(ctx context.Context, videoID string) ([]*model.VideoReply, error) {
	var videoReplies []*model.VideoReply

	err := r.DB.Model(&videoReplies).Order("likes DESC").Select()

	if err != nil {
		return nil, errors.New("failed to retrieve reply")
	}

	return videoReplies, nil
}

func (r *queryResolver) VideoReply(ctx context.Context, userID string, videoID string) (*model.VideoReply, error) {
	var videoReply model.VideoReply

	err := r.DB.Model(&videoReply).Where("video_id = ?", videoID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve reply")
	}

	return &videoReply, nil
}

func (r *videoReplyResolver) User(ctx context.Context, obj *model.VideoReply) (*model.User, error) {
	var user model.User
	err := r.DB.Model(&user).Where("id = ?", obj.UserID).Select()
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *videoReplyResolver) ReplyReplies(ctx context.Context, obj *model.VideoReply) ([]*model.ReplyReplies, error) {
	var ReplyReplies []*model.ReplyReplies
	err := r.DB.Model(&ReplyReplies).Where("reply_id = ?", obj.ReplyID).Select()
	if err != nil {
		return nil, errors.New("failed to retrieve videoReplies")
	}
	return ReplyReplies, nil
}

// VideoReply returns generated.VideoReplyResolver implementation.
func (r *Resolver) VideoReply() generated.VideoReplyResolver { return &videoReplyResolver{r} }

type videoReplyResolver struct{ *Resolver }
