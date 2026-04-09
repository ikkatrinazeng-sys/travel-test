package main

import (
	"log"
	"os"

	"travel-server/db"
	"travel-server/handlers"
	"travel-server/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// 加载 ../.env.local（与 Next.js 共享环境变量）
	_ = godotenv.Load("../.env.local")
	_ = godotenv.Load(".env")

	db.Init()

	r := gin.Default()

	// CORS：允许 Next.js 前端调用
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		// ── Auth ──────────────────────────────────────────────
		api.POST("/auth/login", handlers.Login)

		// ── Cities (public read) ──────────────────────────────
		api.GET("/cities", handlers.ListCities)
		api.GET("/cities/:slug", handlers.GetCity)

		// ── Cities (auth write) ───────────────────────────────
		auth := api.Group("/")
		auth.Use(middleware.AuthRequired())
		{
			auth.POST("cities", handlers.CreateCity)
			auth.PUT("cities/:id", handlers.UpdateCity)
			auth.DELETE("cities/:id", handlers.DeleteCity)

			auth.PUT("cities/:id/guide", handlers.UpsertGuide)
			auth.PUT("cities/:id/story", handlers.UpsertStory)
			auth.PUT("cities/:id/photos", handlers.ReplacePhotos)

			// ── Homepage modules ──────────────────────────────
			auth.GET("hero-polaroids", handlers.ListHeroPolaroids)
			auth.POST("hero-polaroids", handlers.CreateHeroPolaroid)
			auth.PUT("hero-polaroids/:id", handlers.UpdateHeroPolaroid)
			auth.DELETE("hero-polaroids/:id", handlers.DeleteHeroPolaroid)

			auth.GET("recent-updates", handlers.ListRecentUpdates)
			auth.POST("recent-updates", handlers.CreateRecentUpdate)
			auth.PUT("recent-updates/:id", handlers.UpdateRecentUpdate)
			auth.DELETE("recent-updates/:id", handlers.DeleteRecentUpdate)

			auth.GET("photography-cities", handlers.ListPhotographyCities)
			auth.POST("photography-cities", handlers.CreatePhotographyCity)
			auth.DELETE("photography-cities/:id", handlers.DeletePhotographyCity)
			auth.PUT("photography-cities/:id/photos", handlers.ReplacePhotographyPhotos)

			// ── Upload ────────────────────────────────────────
			auth.POST("upload", handlers.Upload)
		}
	}

	port := os.Getenv("GO_PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Go API server listening on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
