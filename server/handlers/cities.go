package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"travel-server/db"
	"travel-server/models"

	"github.com/gin-gonic/gin"
)

// GET /api/cities
func ListCities(c *gin.Context) {
	var cities []models.City
	db.DB.Order("region, name").Find(&cities)
	c.JSON(http.StatusOK, cities)
}

// GET /api/cities/:slug
func GetCity(c *gin.Context) {
	slug := c.Param("slug")
	var city models.City
	if err := db.DB.Preload("Photos").Preload("Videos").Preload("Guide").Preload("Story").
		Where("slug = ?", slug).First(&city).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "city not found"})
		return
	}
	c.JSON(http.StatusOK, city)
}

type cityInput struct {
	Slug       string  `json:"slug" binding:"required"`
	Name       string  `json:"name" binding:"required"`
	Country    string  `json:"country" binding:"required"`
	Region     string  `json:"region" binding:"required"`
	Year       int     `json:"year" binding:"required"`
	CoverColor string  `json:"coverColor" binding:"required"`
	Summary    string  `json:"summary" binding:"required"`
	HeroQuote  *string `json:"heroQuote"`
	Coords     string  `json:"coords"`
	CoverPhoto string  `json:"coverPhoto"`
	CoverThumb string  `json:"coverThumb"`
}

// POST /api/cities  (auth required)
func CreateCity(c *gin.Context) {
	var input cityInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	city := models.City{
		Slug: input.Slug, Name: input.Name, Country: input.Country,
		Region: input.Region, Year: input.Year, CoverColor: input.CoverColor,
		Summary: input.Summary, HeroQuote: input.HeroQuote,
		Coords: input.Coords, CoverPhoto: input.CoverPhoto, CoverThumb: input.CoverThumb,
	}
	if err := db.DB.Create(&city).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, city)
}

// PUT /api/cities/:id  (auth required)
func UpdateCity(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var city models.City
	if err := db.DB.First(&city, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "city not found"})
		return
	}
	var input cityInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Model(&city).Updates(map[string]interface{}{
		"slug": input.Slug, "name": input.Name, "country": input.Country,
		"region": input.Region, "year": input.Year, "coverColor": input.CoverColor,
		"summary": input.Summary, "heroQuote": input.HeroQuote,
		"coords": input.Coords, "coverPhoto": input.CoverPhoto, "coverThumb": input.CoverThumb,
	})
	c.JSON(http.StatusOK, city)
}

// DELETE /api/cities/:id  (auth required)
func DeleteCity(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := db.DB.Delete(&models.City{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// ─── Guide ───────────────────────────────────────────────────────────────────

type guideInput struct {
	Stay      []string `json:"stay"`
	Eat       []string `json:"eat"`
	Transport string   `json:"transport"`
	Tips      []string `json:"tips"`
}

// PUT /api/cities/:id/guide  (auth required)
func UpsertGuide(c *gin.Context) {
	cityID, _ := strconv.Atoi(c.Param("id"))
	var input guideInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	stayJSON := `["` + strings.Join(input.Stay, `","`) + `"]`
	eatJSON := `["` + strings.Join(input.Eat, `","`) + `"]`
	tipsJSON := `["` + strings.Join(input.Tips, `","`) + `"]`
	if len(input.Stay) == 0 {
		stayJSON = "[]"
	}
	if len(input.Eat) == 0 {
		eatJSON = "[]"
	}
	if len(input.Tips) == 0 {
		tipsJSON = "[]"
	}

	guide := models.Guide{
		CityID:    uint(cityID),
		Stay:      stayJSON,
		Eat:       eatJSON,
		Transport: input.Transport,
		Tips:      tipsJSON,
	}

	var existing models.Guide
	if err := db.DB.Where("cityId = ?", cityID).First(&existing).Error; err == nil {
		db.DB.Model(&existing).Updates(map[string]interface{}{
			"stay": stayJSON, "eat": eatJSON, "transport": input.Transport, "tips": tipsJSON,
		})
		c.JSON(http.StatusOK, existing)
	} else {
		db.DB.Create(&guide)
		c.JSON(http.StatusCreated, guide)
	}
}

// ─── Story ───────────────────────────────────────────────────────────────────

type storyInput struct {
	Title      string `json:"title"`
	Date       string `json:"date"`
	Content    string `json:"content"`
	CoverImage string `json:"coverImage"`
}

// PUT /api/cities/:id/story  (auth required)
func UpsertStory(c *gin.Context) {
	cityID, _ := strconv.Atoi(c.Param("id"))
	var input storyInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	story := models.Story{
		CityID: uint(cityID), Title: input.Title, Date: input.Date,
		Content: input.Content, CoverImage: input.CoverImage,
	}
	var existing models.Story
	if err := db.DB.Where("cityId = ?", cityID).First(&existing).Error; err == nil {
		db.DB.Model(&existing).Updates(map[string]interface{}{
			"title": input.Title, "date": input.Date, "content": input.Content, "coverImage": input.CoverImage,
		})
		c.JSON(http.StatusOK, existing)
	} else {
		db.DB.Create(&story)
		c.JSON(http.StatusCreated, story)
	}
}

// ─── Photos ──────────────────────────────────────────────────────────────────

type photoInput struct {
	Src     string  `json:"src"`
	Caption *string `json:"caption"`
	Order   int     `json:"order"`
}

// PUT /api/cities/:id/photos  (auth required) — full replace
func ReplacePhotos(c *gin.Context) {
	cityID, _ := strconv.Atoi(c.Param("id"))
	var inputs []photoInput
	if err := c.ShouldBindJSON(&inputs); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.DB.Where("cityId = ?", cityID).Delete(&models.Photo{})
	for _, p := range inputs {
		db.DB.Create(&models.Photo{CityID: uint(cityID), Src: p.Src, Caption: p.Caption, Order: p.Order})
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}
