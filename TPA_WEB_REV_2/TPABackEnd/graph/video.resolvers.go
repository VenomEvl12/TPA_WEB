package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/generated"
	"TPABackEnd/graph/model"
	"context"
	"errors"
	"math/rand"
	"time"

	pg "github.com/go-pg/pg/v10"
)

func (r *mutationResolver) CreateVideo(ctx context.Context, input *model.NewVideo) (*model.Video, error) {
	num := 0

	var video = model.Video{
		UserID:       input.UserID,
		Title:        input.Title,
		Thumbnail:    input.Thumbnail,
		Views:        &num,
		Day:          input.Day,
		Month:        input.Month,
		Year:         input.Year,
		Like:         &num,
		Dislike:      &num,
		Descriptions: input.Descriptions,
		SourceLink:   input.SourceLink,
		Category:     input.Category,
		VideoLength:  input.VideoLength,
		Location:     input.Location,
		Restriction:  input.Restriction,
		Premium:      input.Premium,
	}

	_, err := r.DB.Model(&video).Insert()

	if err != nil {
		return nil, errors.New("failed to insert")
	}

	return &video, nil
}

func (r *mutationResolver) UpdateViews(ctx context.Context, videoID string) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	*video.Views += 1

	_, updateErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &video, nil
}

func (r *mutationResolver) UpdateLike(ctx context.Context, videoID string, likeVal bool) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	if likeVal == false {
		*video.Like += 1
	} else {
		*video.Like -= 1
	}

	_, updateErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &video, nil
}

func (r *mutationResolver) UpdateDislike(ctx context.Context, videoID string, likeVal bool) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	if likeVal == false {
		*video.Dislike += 1
	} else {
		*video.Dislike -= 1
	}

	_, updateErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &video, nil
}

func (r *mutationResolver) UpdateDescription(ctx context.Context, videoID string, descriptions *string) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	video.Descriptions = descriptions

	_, updateErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &video, nil
}

func (r *mutationResolver) UpdateRestriction(ctx context.Context, videoID string, restriction *bool) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	video.Restriction = restriction

	_, updateErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &video, nil
}

func (r *mutationResolver) UpdatePremiumVideo(ctx context.Context, videoID string, premium *bool) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()
	if err != nil {
		return nil, errors.New("no video")
	}

	video.Premium = premium

	_, updateErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &video, nil
}

func (r *mutationResolver) UpdateVideoType(ctx context.Context, videoID string, typePub bool) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()

	if err != nil {
		return nil, err
	}

	video.TypePub = typePub

	_, uErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if uErr != nil {
		return nil, uErr
	}

	return &video, nil
}

func (r *mutationResolver) UpdateVideo(ctx context.Context, videoID string, desc string, title string, thumbnail string, privacy bool) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()

	if err != nil {
		return nil, err
	}

	video.TypePub = privacy
	*video.Descriptions = desc
	*video.Title = title
	*video.Thumbnail = thumbnail

	_, uErr := r.DB.Model(&video).Where("video_id = ?", videoID).Update()

	if uErr != nil {
		return nil, uErr
	}

	return &video, nil
}

func (r *mutationResolver) RemoveVideo(ctx context.Context, videoID string) (bool, error) {
	var video model.Video
	success := true
	failed := false

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()

	if err != nil {
		return failed, errors.New("video is not on list")
	}

	_, deleteVideo := r.DB.Model(&video).Where("video_id = ?", videoID).Delete()

	if deleteVideo != nil {
		return failed, errors.New("cannot delete this vid")
	}

	return success, nil
}

func (r *queryResolver) Videos(ctx context.Context, videoID string) (*model.Video, error) {
	var video model.Video

	err := r.DB.Model(&video).Where("video_id = ?", videoID).Select()

	if err != nil {
		return nil, errors.New("failed to get video")
	}

	return &video, nil
}

func (r *queryResolver) ListVideos(ctx context.Context) ([]*model.Video, error) {
	var videos []*model.Video

	err := r.DB.Model(&videos).Select()

	if err != nil {
		return nil, errors.New("failed to get videos")
	}

	return videos, nil
}

func (r *queryResolver) VideoByLocation(ctx context.Context, location string, restriction bool, premium bool) ([]*model.Video, error) {
	var videos []*model.Video
	var res = restriction
	var videosNon []*model.Video
	var err error
	var errS error
	if res == false {
		if premium == false {
			err = r.DB.Model(&videos).Where("location = ? AND premium = FALSE AND type_pub = TRUE", location).Select()
			errS = r.DB.Model(&videosNon).Where("location != ? AND premium = FALSE AND type_pub = TRUE", location).Select()
		} else {
			err = r.DB.Model(&videos).Where("location = ?", location).Select()
			errS = r.DB.Model(&videosNon).Where("location != ?", location).Select()
		}

	} else {
		res = false
		if premium == false {
			err = r.DB.Model(&videos).Where("location = ? AND restriction = ? AND premium = false AND type_pub = TRUE", location, res).Select()
			errS = r.DB.Model(&videosNon).Where("location != ? AND restriction = ? AND premium = FALSE AND type_pub = TRUE", location, res).Select()
		} else {
			err = r.DB.Model(&videos).Where("location = ? AND restriction = ? AND type_pub = TRUE", location, res).Select()
			errS = r.DB.Model(&videosNon).Where("location != ? AND restriction = ? AND type_pub = TRUE", location, res).Select()
		}

	}

	if err != nil || errS != nil {
		return nil, errors.New("failed to get videos")
	}

	rand.Seed(time.Now().Unix())
	rand.Shuffle(len(videos), func(i, j int) {
		videos[i], videos[j] = videos[j], videos[i]
	})

	rand.Seed(time.Now().Unix())
	rand.Shuffle(len(videosNon), func(i, j int) {
		videosNon[i], videosNon[j] = videosNon[j], videosNon[i]
	})

	for _, item := range videosNon {
		videos = append(videos, item)
	}

	return videos, nil
}

func (r *queryResolver) VideoByLocationSort(ctx context.Context, restriction bool, premium bool) ([]*model.Video, error) {
	var videos []*model.Video
	var res = restriction
	var err error

	if res == false {
		if premium == false {
			err = r.DB.Model(&videos).Where("premium = FALSE AND type_pub = TRUE").Order("views DESC").Limit(20).Select()
		} else {
			err = r.DB.Model(&videos).Order("views DESC").Limit(20).Select()
		}

	} else {
		res = false
		if premium == false {
			err = r.DB.Model(&videos).Where("restriction = ? AND premium = FALSE AND type_pub = TRUE", res).Order("views DESC").Limit(20).Select()
		} else {
			err = r.DB.Model(&videos).Where("restriction = ? AND type_pub = TRUE", res).Order("views DESC").Limit(20).Select()
		}
	}

	if err != nil {
		return nil, errors.New("failed to get videos")
	}

	return videos, nil
}

func (r *queryResolver) VideoByCategory(ctx context.Context, category string, restriction bool, premium bool) ([]*model.Video, error) {
	var videos []*model.Video
	var res = restriction
	var err error

	if res == false {
		if premium == false {
			err = r.DB.Model(&videos).Where("category = ? AND premium = FALSE AND type_pub = TRUE", category).Order("views DESC").Select()
		} else {
			err = r.DB.Model(&videos).Where("category = ? AND type_pub = TRUE", category).Order("views DESC").Select()
		}
	} else {
		res = false
		if premium == false {
			err = r.DB.Model(&videos).Where("category = ? AND restriction = ? AND premium = FALSE AND type_pub = TRUE", category, res).Order("views DESC").Select()
		} else {
			err = r.DB.Model(&videos).Where("category = ? AND restriction = ? AND type_pub = TRUE", category, res).Order("views DESC").Select()
		}
	}

	if err != nil {
		return nil, errors.New("failed to get videos")
	}

	return videos, nil
}

func (r *queryResolver) VideoByUser(ctx context.Context, userID string, restriction bool, premium bool) ([]*model.Video, error) {
	var videos []*model.Video
	var res = restriction
	var err error

	if res == false {
		if premium == false {
			err = r.DB.Model(&videos).Where("user_id = ? AND premium = FALSE AND type_pub = TRUE", userID).Order("views DESC").Select()
		} else {
			err = r.DB.Model(&videos).Where("user_id = ? AND type_pub = TRUE", userID).Order("views DESC").Select()
		}
	} else {
		res = false
		if premium == false {
			err = r.DB.Model(&videos).Where("user_id = ? AND restriction = ? AND premium = FALSE", userID, res).Order("views DESC").Select()
		} else {
			err = r.DB.Model(&videos).Where("user_id = ? AND restriction = ?", userID, res).Order("views DESC").Select()
		}
	}

	if err != nil {
		return nil, errors.New("failed to get videos")
	}

	return videos, nil
}

func (r *queryResolver) VideoTotalViews(ctx context.Context, userID string) (int, error) {
	var totalViews int

	_, err := r.DB.Query(pg.Scan(&totalViews), "SELECT SUM(views) FROM videos WHERE user_id = ? AND type_pub = TRUE", userID)

	if err != nil {
		return 0, errors.New("views not found")
	}

	return totalViews, nil
}

func (r *queryResolver) PremiumVideos(ctx context.Context) ([]*model.Video, error) {
	var videos []*model.Video

	err := r.DB.Model(&videos).Where("premium = TRUE AND type_pub = TRUE").Select()

	if err != nil {
		return nil, errors.New("no videos retrieved")
	}

	return videos, nil
}

func (r *queryResolver) GetLastVideos(ctx context.Context, userID string, premium bool, restriction bool) (*model.Video, error) {
	var video model.Video
	var err error

	if restriction == false {
		if premium == true {
			err = r.DB.Model(&video).Where("user_id = ? AND type_pub = TRUE", userID).Order("video_id DESC").Limit(1).Select()
		} else {
			err = r.DB.Model(&video).Where("user_id = ? AND premium = FALSE AND type_pub = TRUE", userID).Order("video_id DESC").Limit(1).Select()
		}
	} else {
		if premium == true {
			err = r.DB.Model(&video).Where("user_id = ? AND restriction != TRUE", userID).Order("video_id DESC").Limit(1).Select()
		} else {
			err = r.DB.Model(&video).Where("user_id = ? AND restriction != TRUE AND premium = FALSE", userID).Order("video_id DESC").Limit(1).Select()
		}

	}

	if err != nil {
		return nil, err
	}

	return &video, nil
}

func (r *queryResolver) GetFiveRandomVideos(ctx context.Context, userID string, restriction bool, premium bool) ([]*model.Video, error) {
	var videos []*model.Video
	var err error

	if restriction == false {
		if premium == false {
			err = r.DB.Model(&videos).Where("user_id = ? AND premium = FALSE AND type_pub = TRUE", userID).Select()
		} else {
			err = r.DB.Model(&videos).Where("user_id = ? AND type_pub = TRUE", userID).Select()
		}
	} else {
		if premium == false {
			err = r.DB.Model(&videos).Where("user_id = ? AND restriction != TRUE AND premium = FALSE", userID).Select()
		} else {
			err = r.DB.Model(&videos).Where("user_id = ? AND restriction != TRUE").Select()
		}
	}

	if err != nil {
		return nil, errors.New("failed to retrieve videos")
	}

	rand.Seed(time.Now().Unix())
	rand.Shuffle(len(videos), func(i, j int) {
		videos[i], videos[j] = videos[j], videos[i]
	})

	var vids []*model.Video

	var x = 0

	for _, item := range videos {
		if x == 4 {
			break
		}
		vids = append(vids, item)
		x++
	}

	return vids, nil
}

func (r *queryResolver) GetVideoByKeyword(ctx context.Context, keyword string) ([]*model.Video, error) {
	var videos []*model.Video

	err := r.DB.Model(&videos).Where("LOWER(title) LIKE LOWER(?) AND type_pub = TRUE", "%"+keyword+"%").Select()

	if err != nil {
		return nil, err
	}

	return videos, nil
}

func (r *queryResolver) GetVideoByKeywordTopFive(ctx context.Context, keyword string) ([]*model.Video, error) {
	var videos []*model.Video

	err := r.DB.Model(&videos).Where("LOWER(title) LIKE LOWER(?) AND type_pub = TRUE", "%"+keyword+"%").Limit(5).Select()

	if err != nil {
		return nil, err
	}

	return videos, nil
}

func (r *queryResolver) RetrieveAllVideos(ctx context.Context, userID string) ([]*model.Video, error) {
	var videos []*model.Video

	err := r.DB.Model(&videos).Where("user_id = ?", userID).Select()

	if err != nil {
		return nil, err
	}

	return videos, nil
}

func (r *videoResolver) User(ctx context.Context, obj *model.Video) (*model.User, error) {
	var user model.User
	err := r.DB.Model(&user).Where("id = ?", obj.UserID).Select()
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *videoResolver) VideoReply(ctx context.Context, obj *model.Video) ([]*model.VideoReply, error) {
	var videoReplies []*model.VideoReply
	err := r.DB.Model(&videoReplies).Where("video_id = ?", obj.VideoID).Select()
	if err != nil {
		return nil, errors.New("failed to retrieve videoReplies")
	}
	return videoReplies, nil
}

// Video returns generated.VideoResolver implementation.
func (r *Resolver) Video() generated.VideoResolver { return &videoResolver{r} }

type videoResolver struct{ *Resolver }
