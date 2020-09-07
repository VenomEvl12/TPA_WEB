package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
)

func (r *mutationResolver) CreatePlaylistSub(ctx context.Context, input model.NewPlaylistSubscribe) (*model.PlaylistSubscribe, error) {
	var playlistSub model.PlaylistSubscribe

	gErr := r.DB.Model(&playlistSub).Where("playlist_id = ? AND user_id = ?", input.PlaylistID, input.UserID).Select()

	if gErr == nil {
		return &playlistSub, nil
	}

	playlistSub = model.PlaylistSubscribe{
		PlaylistID: input.PlaylistID,
		UserID:     input.UserID,
		Subscribe:  false,
	}

	_, err := r.DB.Model(&playlistSub).Insert()

	if err != nil {
		return nil, err
	}

	return &playlistSub, nil
}

func (r *mutationResolver) UpdatePlaylistSub(ctx context.Context, userID string, playlistID string) (*model.PlaylistSubscribe, error) {
	var playlistSub model.PlaylistSubscribe

	gErr := r.DB.Model(&playlistSub).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Select()

	if gErr != nil {
		return nil, gErr
	}

	if playlistSub.Subscribe == false {
		playlistSub.Subscribe = true
	} else {
		playlistSub.Subscribe = false
	}

	_, err := r.DB.Model(&playlistSub).Where("playlist_id  = ? AND user_id = ?", playlistID, userID).Update()

	if err != nil {
		return nil, err
	}

	return &playlistSub, nil
}

func (r *mutationResolver) DeletePlaylistSub(ctx context.Context, userID string, playlistID string) (bool, error) {
	var playlistSub model.PlaylistSubscribe

	gErr := r.DB.Model(&playlistSub).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Select()

	if gErr != nil {
		return false, gErr
	}

	_, err := r.DB.Model(&playlistSub).Where("playlist_id  = ? AND user_id = ?", playlistID, userID).Delete()

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *mutationResolver) DeleteAllPlaylistSubs(ctx context.Context, playlistID string) (bool, error) {
	var playlistSubs []*model.PlaylistSubscribe

	gErr := r.DB.Model(&playlistSubs).Where("playlist_id = ?", playlistID).Select()

	if gErr != nil {
		return false, gErr
	}

	_, err := r.DB.Model(&playlistSubs).Where("playlist_id = ?", playlistID).Delete()

	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *queryResolver) RetrievePlaylistSub(ctx context.Context, userID string, playlistID string) (*model.PlaylistSubscribe, error) {
	var playlist model.PlaylistSubscribe

	gErr := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Select()

	if gErr != nil {
		return nil, gErr
	}
	return &playlist, nil
}

func (r *queryResolver) RetrieveAllPlaylistSubs(ctx context.Context, userID string) ([]*model.PlaylistSubscribe, error) {
	var playlists []*model.PlaylistSubscribe

	gErr := r.DB.Model(&playlists).Where("user_id = ? AND subscribe = TRUE", userID).Select()

	if gErr != nil {
		return nil, gErr
	}
	return playlists, nil
}
