package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"TPABackEnd/graph/model"
	"context"
	"errors"
	"fmt"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input *model.NewUser) (*model.User, error) {
	bool := false
	zero := 0
	user := model.User{
		ID:              input.ID,
		Email:           input.Email,
		Username:        input.Username,
		Premium:         &bool,
		Location:        input.Location,
		Subscribers:     &zero,
		PremiumDayCount: &zero,
	}

	_, err := r.DB.Model(user).Insert()
	if err != nil {
		return nil, errors.New("failed to insert")
	}

	return &user, nil
}

func (r *mutationResolver) UpdatePremium(ctx context.Context, id string, premium *bool) (*bool, error) {
	var user *model.User
	failed := false
	success := true

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return &failed, errors.New("no user")
	}

	user.Premium = premium

	_, updateErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if updateErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdatePremiumCountDay(ctx context.Context, id string, premiumDayCount *int) (*bool, error) {
	var user *model.User
	failed := false
	success := true

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return &failed, errors.New("not user found")
	}

	user.PremiumDayCount = premiumDayCount

	_, uErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if uErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateLocation(ctx context.Context, id string, location *string) (*bool, error) {
	var user *model.User
	failed := false
	success := true

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return &failed, errors.New("not user found")
	}

	user.Location = location

	_, uErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if uErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) UpdateSubscribers(ctx context.Context, id string, subscribers *int) (*bool, error) {
	var user *model.User
	failed := false
	success := true

	err := r.DB.Model(&user).Where("id = ?", id).Select()
	if err != nil {
		return &failed, errors.New("not user found")
	}

	user.Subscribers = subscribers

	_, uErr := r.DB.Model(&user).Where("id = ?", id).Update()

	if uErr != nil {
		return &failed, errors.New("failed to update")
	}

	return &success, nil
}

func (r *mutationResolver) DeleteComputer(ctx context.Context, id string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Users(ctx context.Context, email string) (*model.User, error) {
	var user *model.User

	err := r.DB.Model(&user).Where("email=?", email).Select()
	if err != nil {
		return nil, errors.New("fail to insert user")
	}

	return user, nil
}
