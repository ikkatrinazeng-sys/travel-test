package handlers

import (
	"net/http"
	"strconv"

	"travel-server/db"
	"travel-server/models"

	"github.com/gin-gonic/gin"
)

// ─── Hero Polaroids ──────────────────────────────────────────────────────────

// GET /api/hero-polaroids
func ListHeroPolaroids(c *gin.Context) {
	var items []models.HeroPolaroid
	db.DB.Order("`order`").Find(&items)
	c.JSON(http.StatusOK, items)
}

type polaroidInput struct {
	Name  string  `json:"name" binding:"required"`
	Date  string  `json:"date" binding:"required"`
	Tag   string  `json:"tag" binding:"required"`
	Img   string  `json:"img" binding:"required"`
	Color string  `json:"color"`
	X     float64 `json:"x"`
	Y     float64 `json:"y"`
	Rot   float64 `json:"rot"`
	Spd   float64 `json:"spd"`
	Float string  `json:"float"`
	Delay float64 `json:"delay"`
	Order int     `json:"order"`
}

// POST /api/hero-polaroids  (auth required)
func CreateHeroPolaroid(c *gin.Context) {
	var input polaroidInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item := models.HeroPolaroid{
		Name: input.Name, Date: input.Date, Tag: input.Tag, Img: input.Img,
		Color: input.Color, X: input.X, Y: input.Y, Rot: input.Rot,
		Spd: input.Spd, Float: input.Float, Delay: input.Delay, Order: input.Order,
	}
	db.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

// PUT /api/hero-polaroids/:id  (auth required)
func UpdateHeroPolaroid(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var item models.HeroPolaroid
	if err := db.DB.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	var input polaroidInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Model(&item).Updates(map[string]interface{}{
		"name": input.Name, "date": input.Date, "tag": input.Tag, "img": input.Img,
		"color": input.Color, "x": input.X, "y": input.Y, "rot": input.Rot,
		"spd": input.Spd, "float": input.Float, "delay": input.Delay, "order": input.Order,
	})
	c.JSON(http.StatusOK, item)
}

// DELETE /api/hero-polaroids/:id  (auth required)
func DeleteHeroPolaroid(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	db.DB.Delete(&models.HeroPolaroid{}, id)
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// ─── Recent Updates ──────────────────────────────────────────────────────────

// GET /api/recent-updates
func ListRecentUpdates(c *gin.Context) {
	var items []models.RecentUpdate
	db.DB.Order("`order`").Find(&items)
	c.JSON(http.StatusOK, items)
}

type recentUpdateInput struct {
	Type     string `json:"type" binding:"required"`
	Title    string `json:"title" binding:"required"`
	Excerpt  string `json:"excerpt" binding:"required"`
	City     string `json:"city" binding:"required"`
	CitySlug string `json:"citySlug" binding:"required"`
	Bg       string `json:"bg" binding:"required"`
	Order    int    `json:"order"`
}

// POST /api/recent-updates  (auth required)
func CreateRecentUpdate(c *gin.Context) {
	var input recentUpdateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item := models.RecentUpdate{
		Type: input.Type, Title: input.Title, Excerpt: input.Excerpt,
		City: input.City, CitySlug: input.CitySlug, Bg: input.Bg, Order: input.Order,
	}
	db.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

// PUT /api/recent-updates/:id  (auth required)
func UpdateRecentUpdate(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var item models.RecentUpdate
	if err := db.DB.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	var input recentUpdateInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Model(&item).Updates(map[string]interface{}{
		"type": input.Type, "title": input.Title, "excerpt": input.Excerpt,
		"city": input.City, "citySlug": input.CitySlug, "bg": input.Bg, "order": input.Order,
	})
	c.JSON(http.StatusOK, item)
}

// DELETE /api/recent-updates/:id  (auth required)
func DeleteRecentUpdate(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	db.DB.Delete(&models.RecentUpdate{}, id)
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// ─── Photography Cities ──────────────────────────────────────────────────────

// GET /api/photography-cities
func ListPhotographyCities(c *gin.Context) {
	var cities []models.PhotographyCity
	db.DB.Preload("Photos").Order("`order`").Find(&cities)
	c.JSON(http.StatusOK, cities)
}

type photographyCityInput struct {
	City    string `json:"city" binding:"required"`
	Country string `json:"country" binding:"required"`
	Slug    string `json:"slug" binding:"required"`
	Order   int    `json:"order"`
}

// POST /api/photography-cities  (auth required)
func CreatePhotographyCity(c *gin.Context) {
	var input photographyCityInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	item := models.PhotographyCity{
		City: input.City, Country: input.Country, Slug: input.Slug, Order: input.Order,
	}
	db.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

// DELETE /api/photography-cities/:id  (auth required)
func DeletePhotographyCity(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	db.DB.Delete(&models.PhotographyCity{}, id)
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// PUT /api/photography-cities/:id/photos  (auth required) — full replace
func ReplacePhotographyPhotos(c *gin.Context) {
	cityID, _ := strconv.Atoi(c.Param("id"))
	var photos []struct {
		Src     string `json:"src"`
		Caption string `json:"caption"`
		Order   int    `json:"order"`
	}
	if err := c.ShouldBindJSON(&photos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Where("cityId = ?", cityID).Delete(&models.PhotographyPhoto{})
	for _, p := range photos {
		db.DB.Create(&models.PhotographyPhoto{
			CityID: uint(cityID), Src: p.Src, Caption: p.Caption, Order: p.Order,
		})
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}
