package models

import "time"

// ─── City ────────────────────────────────────────────────────────────────────

type City struct {
	ID         uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Slug       string    `gorm:"uniqueIndex;not null" json:"slug"`
	Name       string    `gorm:"not null" json:"name"`
	Country    string    `gorm:"not null" json:"country"`
	Region     string    `gorm:"not null" json:"region"`
	Year       int       `gorm:"not null" json:"year"`
	CoverColor string    `gorm:"not null" json:"coverColor"`
	Summary    string    `gorm:"not null" json:"summary"`
	HeroQuote  *string   `json:"heroQuote"`
	Coords     string    `gorm:"default:''" json:"coords"`
	CoverPhoto string    `gorm:"default:''" json:"coverPhoto"`
	CoverThumb string    `gorm:"default:''" json:"coverThumb"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`

	Photos []Photo `gorm:"foreignKey:CityID;constraint:OnDelete:CASCADE" json:"photos,omitempty"`
	Videos []Video `gorm:"foreignKey:CityID;constraint:OnDelete:CASCADE" json:"videos,omitempty"`
	Guide  *Guide  `gorm:"foreignKey:CityID;constraint:OnDelete:CASCADE" json:"guide,omitempty"`
	Story  *Story  `gorm:"foreignKey:CityID;constraint:OnDelete:CASCADE" json:"story,omitempty"`
}

func (City) TableName() string { return "City" }

// ─── Photo ───────────────────────────────────────────────────────────────────

type Photo struct {
	ID      uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Src     string  `gorm:"not null" json:"src"`
	Caption *string `json:"caption"`
	Order   int     `gorm:"default:0" json:"order"`
	CityID  uint    `gorm:"not null" json:"cityId"`
}

func (Photo) TableName() string { return "Photo" }

// ─── Video ───────────────────────────────────────────────────────────────────

type Video struct {
	ID        uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Title     string `gorm:"not null" json:"title"`
	EmbedURL  string `gorm:"column:embedUrl;not null" json:"embedUrl"`
	Thumbnail string `gorm:"not null" json:"thumbnail"`
	Order     int    `gorm:"default:0" json:"order"`
	CityID    uint   `gorm:"column:cityId;not null" json:"cityId"`
}

func (Video) TableName() string { return "Video" }

// ─── Guide ───────────────────────────────────────────────────────────────────

type Guide struct {
	ID        uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Stay      string `gorm:"not null" json:"stay"`
	Eat       string `gorm:"not null" json:"eat"`
	Transport string `gorm:"not null" json:"transport"`
	Tips      string `gorm:"not null" json:"tips"`
	CityID    uint   `gorm:"column:cityId;uniqueIndex;not null" json:"cityId"`
}

func (Guide) TableName() string { return "Guide" }

// ─── Story ───────────────────────────────────────────────────────────────────

type Story struct {
	ID         uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Title      string `gorm:"not null" json:"title"`
	Date       string `gorm:"not null" json:"date"`
	Content    string `gorm:"not null" json:"content"`
	CoverImage string `gorm:"column:coverImage;not null" json:"coverImage"`
	CityID     uint   `gorm:"column:cityId;uniqueIndex;not null" json:"cityId"`
}

func (Story) TableName() string { return "Story" }

// ─── HeroPolaroid ────────────────────────────────────────────────────────────

type HeroPolaroid struct {
	ID    uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name  string  `gorm:"not null" json:"name"`
	Date  string  `gorm:"not null" json:"date"`
	Tag   string  `gorm:"not null" json:"tag"`
	Img   string  `gorm:"not null" json:"img"`
	Color string  `gorm:"default:'#1e1e2e'" json:"color"`
	X     float64 `gorm:"default:50" json:"x"`
	Y     float64 `gorm:"default:50" json:"y"`
	Rot   float64 `gorm:"default:0" json:"rot"`
	Spd   float64 `gorm:"default:0.02" json:"spd"`
	Float string  `gorm:"default:'A'" json:"float"`
	Delay float64 `gorm:"default:0.5" json:"delay"`
	Order int     `gorm:"default:0" json:"order"`
}

func (HeroPolaroid) TableName() string { return "HeroPolaroid" }

// ─── RecentUpdate ────────────────────────────────────────────────────────────

type RecentUpdate struct {
	ID       uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Type     string `gorm:"not null" json:"type"`
	Title    string `gorm:"not null" json:"title"`
	Excerpt  string `gorm:"not null" json:"excerpt"`
	City     string `gorm:"not null" json:"city"`
	CitySlug string `gorm:"column:citySlug;not null" json:"citySlug"`
	Bg       string `gorm:"not null" json:"bg"`
	Order    int    `gorm:"default:0" json:"order"`
}

func (RecentUpdate) TableName() string { return "RecentUpdate" }

// ─── PhotographyCity ─────────────────────────────────────────────────────────

type PhotographyCity struct {
	ID      uint               `gorm:"primaryKey;autoIncrement" json:"id"`
	City    string             `gorm:"not null" json:"city"`
	Country string             `gorm:"not null" json:"country"`
	Slug    string             `gorm:"not null" json:"slug"`
	Order   int                `gorm:"default:0" json:"order"`
	Photos  []PhotographyPhoto `gorm:"foreignKey:CityID;constraint:OnDelete:CASCADE" json:"photos,omitempty"`
}

func (PhotographyCity) TableName() string { return "PhotographyCity" }

// ─── PhotographyPhoto ────────────────────────────────────────────────────────

type PhotographyPhoto struct {
	ID      uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Src     string `gorm:"not null" json:"src"`
	Caption string `gorm:"not null" json:"caption"`
	Order   int    `gorm:"default:0" json:"order"`
	CityID  uint   `gorm:"column:cityId;not null" json:"cityId"`
}

func (PhotographyPhoto) TableName() string { return "PhotographyPhoto" }
