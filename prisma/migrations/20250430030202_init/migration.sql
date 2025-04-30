/*
  Warnings:

  - Added the required column `age` to the `Batters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Batters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Batters` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Batters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "AB" INTEGER NOT NULL,
    "H" INTEGER NOT NULL,
    "double" INTEGER NOT NULL,
    "triple" INTEGER NOT NULL,
    "HR" INTEGER NOT NULL,
    "RBI" INTEGER NOT NULL,
    "K" INTEGER NOT NULL,
    "BB" INTEGER NOT NULL,
    "SH" INTEGER NOT NULL,
    "SF" INTEGER NOT NULL,
    "SB" INTEGER NOT NULL
);
INSERT INTO "new_Batters" ("AB", "BB", "H", "HR", "K", "RBI", "SB", "SF", "SH", "double", "id", "triple") SELECT "AB", "BB", "H", "HR", "K", "RBI", "SB", "SF", "SH", "double", "id", "triple" FROM "Batters";
DROP TABLE "Batters";
ALTER TABLE "new_Batters" RENAME TO "Batters";
CREATE UNIQUE INDEX "Batters_id_key" ON "Batters"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
