package main

import (
	"github.com/gin-gonic/gin"
	"go_api/internal/database"
	"go_api/internal/http"
	"go_api/internal/post"
)

func main() {
	connectionString := "postgresql://postgres:Postgres2022!@localhost:5432/db?sslmode=disable"
	conn, err := database.NewConnection(connectionString)
	if err != nil {
		panic(err)
	}

	defer conn.Close()

	repo := post.Repository{
		Conn: conn,
	}

	repo = repo

	g := gin.Default()
	http.Configure()
	http.SetRoutes(g)

	err = g.Run(":3000")
	if err != nil {
		return
	}

}
