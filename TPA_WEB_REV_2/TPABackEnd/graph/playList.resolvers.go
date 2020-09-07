package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
	"math/rand"
	"strconv"
	"time"

	pg "github.com/go-pg/pg/v10"
)

func (r *mutationResolver) CreatePlaylist(ctx context.Context, input model.NewPlaylist) (*model.Playlist, error) {
	var playlist = model.Playlist{
		UserID:            input.UserID,
		VideoID:           "0",
		PlaylistHeader:    input.PlaylistHeader,
		PlaylistType:      input.PlaylistType,
		Description:       input.Description,
		PriorityWeight:    0,
		Views:             0,
		DateAddToPlaylist: time.Now().Format("2006-01-02 15:04:05"),
		DatePublish:       time.Now().Format("2006-01-02 15:04:05"),
		TotalVideo:        0,
	}

	_, err := r.DB.Model(&playlist).Insert()

	if err != nil {
		return nil, err
	}

	return &playlist, nil
}

func (r *mutationResolver) InputVideoToPlayList(ctx context.Context, input model.NewVideoToPlaylist) (*model.Playlist, error) {
	var video model.Playlist
	var vid model.Video

	_, vErr := r.DB.Query(&vid, "SELECT * FROM videos WHERE video_id = ?", input.VideoID)

	if vErr != nil {
		return nil, vErr
	}

	gErr := r.DB.Model(&video).Where("playlist_id = ? AND user_id = ?", input.PlaylistID, input.UserID).Order("priority_weight DESC").Limit(1).Select()

	var tanggal = strconv.Itoa(*vid.Year) + "-" + strconv.Itoa(*vid.Month) + "-" + strconv.Itoa(*vid.Day)
	var weight = video.PriorityWeight + 1

	if gErr != nil {
		return nil, errors.New("failed to retrieve")
	}
	var playlist = model.Playlist{
		PlaylistID:        input.PlaylistID,
		UserID:            input.UserID,
		VideoID:           input.VideoID,
		PlaylistHeader:    video.PlaylistHeader,
		PlaylistType:      video.PlaylistType,
		Description:       video.Description,
		PriorityWeight:    weight,
		Views:             *vid.Views,
		DateAddToPlaylist: time.Now().Format("2006-01-02 15:04:05"),
		DatePublish:       tanggal,
		TotalVideo:        0,
	}

	_, err := r.DB.Model(&playlist).Insert()

	if err != nil {
		return nil, err
	}

	return &playlist, nil
}

func (r *mutationResolver) UpdatePriorityWeight(ctx context.Context, playlistID string, userID string, videoID string, priorityWeight int) (*model.Playlist, error) {
	var playlist model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ? AND video_id = ?", playlistID, userID, videoID).Select()

	if err != nil {
		return nil, err
	}

	playlist.PriorityWeight = priorityWeight

	_, updateErr := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ? AND video_id = ?", playlistID, userID, videoID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return &playlist, nil
}

func (r *mutationResolver) UpdatePlayListDescription(ctx context.Context, playlistID string, userID string, description string) (*model.Playlist, error) {
	var playlist []*model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve playlist")
	}

	for i := 0; i < len(playlist); i++ {
		playlist[i].Description = description
	}

	_, updateErr := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update description")
	}

	return playlist[0], nil
}

func (r *mutationResolver) UpdatePlayListViews(ctx context.Context, playlistID string, userID string) (*model.Playlist, error) {
	var playlist model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ? AND video_id = 0", playlistID, userID).Select()

	if err != nil {
		return nil, err
	}

	playlist.Views += 1

	_, updateErr := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ? AND video_id = 0", playlistID, userID).Update()

	if updateErr != nil {
		return nil, updateErr
	}

	return &playlist, nil
}

func (r *mutationResolver) UpdatePlayListHeader(ctx context.Context, playlistID string, userID string, header string) (*model.Playlist, error) {
	var playlist []*model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Select()

	if err != nil {
		return nil, err
	}

	for i := 0; i < len(playlist); i++ {
		playlist[i].PlaylistHeader = header
	}

	_, updateErr := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return playlist[0], nil
}

func (r *mutationResolver) UpdatePlaylistType(ctx context.Context, playlistID string, userID string, tipe bool) (*model.Playlist, error) {
	var playlist []*model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Select()

	if err != nil {
		return nil, err
	}

	for i := 0; i < len(playlist); i++ {
		playlist[i].PlaylistType = tipe
	}

	_, updateErr := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ?", playlistID, userID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update view")
	}

	return playlist[0], nil
}

func (r *mutationResolver) DeleteVideo(ctx context.Context, playlistID string, userID string, videoID string) (bool, error) {
	var playlist model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ? AND video_id = ?", playlistID, userID, videoID).Select()

	if err != nil {
		return false, errors.New("playlist is not on list")
	}

	_, deleteVideo := r.DB.Model(&playlist).Where("playlist_id = ? AND user_id = ? AND video_id = ?", playlistID, userID, videoID).Delete()

	if deleteVideo != nil {
		return false, errors.New("cannot delete this playlist")
	}

	return true, nil
}

func (r *mutationResolver) DeletePlaylist(ctx context.Context, playlistID string, userID string) (bool, error) {
	var comVal model.ChannelCommunityVali
	success := true
	failed := false

	err := r.DB.Model(&comVal).Where("playlist_id = ? AND user_id = ?", userID).Select()

	if err != nil {
		return failed, errors.New("playlist is not on list")
	}

	_, deleteVideo := r.DB.Model(&comVal).Where("playlist_id AND user_id = ?", userID).Delete()

	if deleteVideo != nil {
		return failed, errors.New("cannot delete this playlist")
	}

	return success, nil
}

func (r *queryResolver) Playlists(ctx context.Context, userID string) ([]*model.Playlist, error) {
	var playlist []*model.Playlist

	err := r.DB.Model(&playlist).Where("user_id = ? AND video_id != 0", userID).DistinctOn("playlist_id").Select()

	if err != nil {
		return nil, err
	}

	return playlist, nil
}

func (r *queryResolver) PlaylistsPublic(ctx context.Context, userID string) ([]*model.Playlist, error) {
	var playlist []*model.Playlist
	var playlists []*model.Playlist

	err := r.DB.Model(&playlist).Where("user_id = ? AND video_id != 0 AND playlist_type = TRUE", userID).DistinctOn("playlist_id").Select()

	if err != nil {
		return nil, err
	}

	var x = 0

	for _, item := range playlist {
		count := 0
		_, cErr := r.DB.Query(pg.Scan(&count), "SELECT COUNT(playlist_id) FROM playlists WHERE playlist_id = ? AND video_id != 0", playlist[x].PlaylistID)

		if cErr != nil {
			return nil, errors.New("failed to retrieve playlist")
		}

		playlists = append(playlists, item)
		playlists[x].TotalVideo = count
		x++
	}

	return playlist, nil
}

func (r *queryResolver) PriorityNumber(ctx context.Context, playlistID string) (*model.Playlist, error) {
	var playlist model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ?", playlistID).Select()

	if err != nil {
		return nil, errors.New("failed to retrieve playlist")
	}

	return &playlist, nil
}

func (r *queryResolver) Playlist(ctx context.Context, playlistID string) (*model.Playlist, error) {
	var playlist model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND video_id = 0", playlistID).Limit(1).Select()

	count := 0
	_, cErr := r.DB.Query(pg.Scan(&count), "SELECT COUNT(playlist_id) FROM playlists WHERE playlist_id = ? AND video_id != 0", playlistID)

	if err != nil || cErr != nil {
		return nil, errors.New("failed to retrieve playlist")
	}

	playlist.TotalVideo = count

	return &playlist, nil
}

func (r *queryResolver) PlaylistListVideos(ctx context.Context, playlistID string) ([]*model.Playlist, error) {
	var playlist []*model.Playlist

	err := r.DB.Model(&playlist).Where("playlist_id = ? AND video_id != 0", playlistID).Order("priority_weight ASC").Select()

	if err != nil {
		return nil, errors.New("failed to retrieve playlist")
	}

	return playlist, nil
}

func (r *queryResolver) PlaylistsRandom(ctx context.Context, userID string) ([]*model.Playlist, error) {
	var playlist []*model.Playlist

	var playlistsRand []*model.Playlist

	err := r.DB.Model(&playlist).Where("user_id = ? AND video_id != 0 AND playlist_type = true", userID).DistinctOn("playlist_id").Select()

	if err != nil {
		return nil, errors.New("failed to retrieve playlist")
	}
	rand.Seed(time.Now().Unix())
	rand.Shuffle(len(playlist), func(i, j int) {
		playlist[i], playlist[j] = playlist[j], playlist[i]
	})

	var x = 0

	for _, item := range playlist {
		if x == 3 {
			break
		}
		count := 0
		_, cErr := r.DB.Query(pg.Scan(&count), "SELECT COUNT(playlist_id) FROM playlists WHERE playlist_id = ? AND video_id != 0", playlist[x].PlaylistID)

		if cErr != nil {
			return nil, errors.New("failed to retrieve playlist")
		}

		playlistsRand = append(playlistsRand, item)
		playlistsRand[x].TotalVideo = count
		x++
	}

	return playlist, nil
}

func (r *queryResolver) PlaylistsByKeyword(ctx context.Context, keyword string) ([]*model.Playlist, error) {
	var playlists []*model.Playlist

	err := r.DB.Model(&playlists).Where("LOWER(playlist_header) LIKE LOWER(?) AND playlist_type = TRUE AND video_id != 0", "%"+keyword+"%").DistinctOn("playlist_id").Select()

	if err != nil {
		return nil, err
	}

	totalVideo := 0
	for i := 0; i < len(playlists); i++ {
		totalVideo = 0
		_, gErr := r.DB.Query(pg.Scan(&totalVideo), "SELECT COUNT (playlist_id) FROM playlists WHERE playlist_id = ? AND video_id != 0", playlists[i].PlaylistID)
		if gErr != nil {
			return nil, gErr
		}
		playlists[i].TotalVideo = totalVideo
	}

	return playlists, nil
}
