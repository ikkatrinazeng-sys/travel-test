-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "coverColor" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "heroQuote" TEXT,
    "coords" TEXT NOT NULL DEFAULT '',
    "coverPhoto" TEXT NOT NULL DEFAULT '',
    "coverThumb" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_City" ("country", "coverColor", "createdAt", "heroQuote", "id", "name", "region", "slug", "summary", "updatedAt", "year") SELECT "country", "coverColor", "createdAt", "heroQuote", "id", "name", "region", "slug", "summary", "updatedAt", "year" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
