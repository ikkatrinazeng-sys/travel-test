package db

import (
	"log"
	"os"

	"travel-server/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Init 打开 SQLite 数据库（复用 Prisma 生成的 dev.db）
func Init() {
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "../prisma/dev.db"
	}

	var err error
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// 不执行 AutoMigrate，表结构由 Prisma 管理
	_ = models.City{}
	log.Println("database connected:", dbPath)
}
