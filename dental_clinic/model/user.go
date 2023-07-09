package model

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
	Role     string `json:"role"`
}
type LoginRequest struct {
	Email string `json:"email"`
}
type LoginResponse struct {
	Email     string `json:"email"`
	IsDentist bool   `json:"is_dentist"`
}
