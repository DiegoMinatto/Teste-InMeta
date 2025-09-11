-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'P',
    "documentTypeId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    CONSTRAINT "Documents_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Documents_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentTypes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Documents" ("documentTypeId", "employeeId", "id", "name", "status") SELECT "documentTypeId", "employeeId", "id", "name", "status" FROM "Documents";
DROP TABLE "Documents";
ALTER TABLE "new_Documents" RENAME TO "Documents";
CREATE UNIQUE INDEX "Documents_documentTypeId_employeeId_key" ON "Documents"("documentTypeId", "employeeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
