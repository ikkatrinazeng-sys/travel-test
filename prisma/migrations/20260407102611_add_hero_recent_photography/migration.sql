-- CreateTable
CREATE TABLE "HeroPolaroid" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#1e1e2e',
    "x" REAL NOT NULL DEFAULT 50,
    "y" REAL NOT NULL DEFAULT 50,
    "rot" REAL NOT NULL DEFAULT 0,
    "spd" REAL NOT NULL DEFAULT 0.02,
    "float" TEXT NOT NULL DEFAULT 'A',
    "delay" REAL NOT NULL DEFAULT 0.5,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "RecentUpdate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "citySlug" TEXT NOT NULL,
    "bg" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PhotographyCity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PhotographyPhoto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "cityId" INTEGER NOT NULL,
    CONSTRAINT "PhotographyPhoto_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "PhotographyCity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
