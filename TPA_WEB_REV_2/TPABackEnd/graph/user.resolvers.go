package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
	"time"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input *model.NewUser) (*model.User, error) {
	var tempUser model.User

	checkErr := r.DB.Model(&tempUser).Where("email = ?", input.Email).Select()

	if checkErr == nil {
		return &tempUser, nil
	}

	var date = time.Now().Format("02-01-2006")

	user := model.User{
		Email:           input.Email,
		Username:        input.Username,
		Premium:         false,
		Location:        input.Location,
		Subscribers:     0,
		PremiumDayCount: 0,
		Thumbnail:       input.Thumbnail,
		Date:            date,
	}

	_, err := r.DB.Model(&user).Insert()
	if err != nil {
		return nil, errors.New("failed to insert")
	}

	return &user, nil
}

func (r *mutationResolver) UpdatePremium(ctx context.Context, id string, premium bool) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return nil, errors.New("no user")
	}

	user.Premium = premium

	_, updateErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &user, nil
}

func (r *mutationResolver) UpdatePremiumCountDay(ctx context.Context, id string, premiumDayCount int) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return nil, errors.New("not user found")
	}

	user.PremiumDayCount += premiumDayCount

	_, uErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if uErr != nil {
		return nil, errors.New("failed to update")
	}

	return &user, nil
}

func (r *mutationResolver) UpdateLocation(ctx context.Context, id string, location string) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return nil, errors.New("not user found")
	}
	if user.Location == location {
		return nil, errors.New("location is same")
	}

	user.Location = location

	_, uErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if uErr != nil {
		return nil, errors.New("failed to update")
	}

	return &user, nil
}

func (r *mutationResolver) UpdateSubscribers(ctx context.Context, id string, subscribe bool) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return nil, errors.New("not user found")
	}

	if subscribe == true {
		user.Subscribers += 1
	} else {
		user.Subscribers -= 1
	}

	_, uErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if uErr != nil {
		return nil, errors.New("failed to update")
	}

	return &user, nil
}

func (r *mutationResolver) UpdateRestrictionUser(ctx context.Context, id string, restriction bool) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return nil, errors.New("no user")
	}

	if user.Restriction == restriction {
		return nil, errors.New("update failed")
	}

	user.Restriction = restriction

	_, updateErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if updateErr != nil {
		return nil, errors.New("failed to update")
	}

	return &user, nil
}

func (r *queryResolver) Users(ctx context.Context, email string) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("email=?", email).Select()
	if err != nil {
		return nil, errors.New("fail to get user")
	}

	return &user, nil
}

func (r *queryResolver) UserByID(ctx context.Context, id string) (*model.User, error) {
	var user model.User

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return nil, errors.New("fail to get user")
	}

	return &user, nil
}

func (r *queryResolver) ListUsers(ctx context.Context) ([]*model.User, error) {
	var users []*model.User

	err := r.DB.Model(&users).Select()
	if err != nil {
		return nil, errors.New("fail to get user")
	}

	return users, nil
}

func (r *queryResolver) GetUserByKeyword(ctx context.Context, keyword string) ([]*model.User, error) {
	var users []*model.User

	err := r.DB.Model(&users).Where(" LOWER(username) LIKE LOWER(?)", "%"+keyword+"%").Select()

	if err != nil {
		return nil, err
	}

	return users, nil
}
