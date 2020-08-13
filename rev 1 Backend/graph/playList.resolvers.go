package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"fmt"
)

func (r *mutationResolver) CreatePlaylist(ctx context.Context, input *model.NewPlaylist) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdatePriorityWeight(ctx context.Context, playlistID string, priorityWeight *int) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteVideo(ctx context.Context, playlistID string, videoID *int) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeletePlaylist(ctx context.Context, playListID string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Playlist(ctx context.Context) ([]*model.Playlist, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) PriorityNumber(ctx context.Context, playlistID string) (*model.Playlist, error) {
	panic(fmt.Errorf("not implemented"))
}
