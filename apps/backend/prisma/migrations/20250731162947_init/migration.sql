-- CreateTable
CREATE TABLE "topics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner" TEXT,
    "keyword" TEXT,
    "categories" TEXT,
    "country" TEXT,
    "language" TEXT,
    "sorting" TEXT
);

-- CreateTable
CREATE TABLE "articles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT,
    "date" TEXT,
    "time" TEXT,
    "dateTime" DATETIME,
    "dateTimePub" DATETIME,
    "title" TEXT,
    "body" TEXT,
    "image" TEXT,
    "source" JSONB,
    "metadata" JSONB,
    "apiSource" TEXT,
    "url" TEXT,
    "uri" TEXT
);
