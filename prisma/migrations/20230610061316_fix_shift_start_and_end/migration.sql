-- AlterTable
ALTER TABLE `Shift` MODIFY `shiftStart` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `shiftEnd` DATETIME(3) NULL;