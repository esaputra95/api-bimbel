-- CreateTable
CREATE TABLE `class` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(15) NULL,
    `name` VARCHAR(25) NOT NULL,
    `classTypeId` VARCHAR(36) NULL,
    `method` ENUM('online', 'offline') NULL DEFAULT 'online',
    `description` VARCHAR(50) NULL,
    `useraCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `classTypeId`(`classTypeId`),
    INDEX `useraCreate`(`useraCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classTypes` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(15) NULL,
    `name` VARCHAR(25) NULL,
    `price` DECIMAL(14, 3) NULL,
    `description` VARCHAR(50) NULL,
    `useraCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `useraCreate`(`useraCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` VARCHAR(36) NOT NULL,
    `majorId` VARCHAR(36) NULL,
    `code` VARCHAR(50) NULL,
    `name` VARCHAR(150) NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `majorId`(`majorId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guidanceTypes` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(150) NULL,
    `total` INTEGER NULL,
    `type` ENUM('private', 'reguler') NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(150) NULL,
    `description` VARCHAR(150) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `majors` (
    `id` VARCHAR(36) NOT NULL,
    `universityId` VARCHAR(36) NULL,
    `code` VARCHAR(50) NULL,
    `name` VARCHAR(150) NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `universityId`(`universityId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materials` (
    `id` VARCHAR(36) NOT NULL,
    `courseId` VARCHAR(36) NULL,
    `userCreate` VARCHAR(36) NULL,
    `name` VARCHAR(100) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `courseId`(`courseId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(150) NULL,
    `description` VARCHAR(150) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payrollDetails` (
    `id` VARCHAR(36) NOT NULL,
    `payrollId` VARCHAR(36) NULL,
    `scheduleId` VARCHAR(36) NULL,
    `price` DECIMAL(14, 4) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `payrollId`(`payrollId`),
    INDEX `scheduleId`(`scheduleId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payrolls` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NULL,
    `basicSalary` DECIMAL(14, 4) NULL,
    `sessionSalary` DECIMAL(14, 4) NULL,
    `total` DECIMAL(14, 4) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissionNames` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(150) NULL,
    `group` VARCHAR(100) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NULL,
    `action` VARCHAR(150) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recordMateri` (
    `id` VARCHAR(36) NOT NULL,
    `date` DATETIME(0) NULL,
    `studentId` VARCHAR(36) NULL,
    `materiId` VARCHAR(36) NULL,
    `description` TEXT NULL,
    `advice` TEXT NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `materiId`(`materiId`),
    INDEX `studentId`(`studentId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registers` (
    `id` VARCHAR(36) NOT NULL,
    `studentId` VARCHAR(36) NULL,
    `classId` VARCHAR(36) NULL,
    `university` VARCHAR(36) NULL,
    `amount` INTEGER NULL,
    `sessionId` VARCHAR(36) NULL,
    `packageId` VARCHAR(36) NULL,
    `guidanceTypeId` VARCHAR(36) NULL,
    `locationId` VARCHAR(36) NULL,
    `schoolYearId` VARCHAR(36) NULL,
    `status` ENUM('student', 'alumni') NULL DEFAULT 'student',
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,
    `invoiceStatus` ENUM('pending', 'generated') NULL DEFAULT 'pending',

    INDEX `classId`(`classId`),
    INDEX `guidanceTypeId`(`guidanceTypeId`),
    INDEX `locationId`(`locationId`),
    INDEX `packageId`(`packageId`),
    INDEX `schoolYearId`(`schoolYearId`),
    INDEX `sessionId`(`sessionId`),
    INDEX `studentId`(`studentId`),
    INDEX `university`(`university`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roleHasPermissions` (
    `id` VARCHAR(36) NOT NULL,
    `roleId` VARCHAR(36) NULL,
    `permissionId` VARCHAR(36) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `permissionId`(`permissionId`),
    INDEX `roleId`(`roleId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(15) NULL,
    `name` VARCHAR(25) NULL,
    `description` VARCHAR(50) NULL,
    `useraCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `useraCreate`(`useraCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedules` (
    `id` VARCHAR(36) NOT NULL,
    `studyGroupId` VARCHAR(36) NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `tentorId` VARCHAR(36) NOT NULL,
    `roomId` VARCHAR(36) NULL,
    `type` ENUM('study', 'try-out') NULL DEFAULT 'study',
    `materiId` VARCHAR(36) NULL,
    `method` ENUM('online', 'offline') NULL DEFAULT 'online',
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `roomId`(`roomId`),
    INDEX `studyGroupId`(`studyGroupId`),
    INDEX `tentorId`(`tentorId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schoolYears` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(20) NULL,
    `description` VARCHAR(100) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(50) NULL,
    `name` VARCHAR(50) NULL,
    `quantity` INTEGER NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NULL,
    `studyProgram` VARCHAR(100) NULL,
    `phone` VARCHAR(15) NULL,
    `school` VARCHAR(100) NULL,
    `placeBird` VARCHAR(100) NULL,
    `dateBirth` DATE NULL,
    `address` TEXT NULL,
    `gender` ENUM('laki-laki', 'perempuan') NULL,
    `classGrade` VARCHAR(50) NULL,
    `university` VARCHAR(100) NULL,
    `statusStudy` ENUM('study', 'alumni') NULL,
    `parentName` VARCHAR(100) NULL,
    `parentPhone` VARCHAR(15) NULL,
    `image` TEXT NULL,
    `agreement` SMALLINT NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studyGroupDetails` (
    `id` VARCHAR(36) NOT NULL,
    `studyGroupId` VARCHAR(36) NULL,
    `studentId` VARCHAR(36) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `studentId`(`studentId`),
    INDEX `studyGroupId`(`studyGroupId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studyGroups` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NULL,
    `classId` VARCHAR(36) NULL,
    `guidanceTypeId` VARCHAR(36) NULL,
    `total` SMALLINT NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `classId`(`classId`),
    INDEX `guidanceTypeId`(`guidanceTypeId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tentorNotAvailable` (
    `id` VARCHAR(36) NOT NULL,
    `tentorId` VARCHAR(36) NULL,
    `startDate` DATETIME(0) NULL,
    `untilDate` DATETIME(0) NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `tentorId`(`tentorId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tentorSkills` (
    `id` VARCHAR(36) NOT NULL,
    `tentorId` VARCHAR(36) NULL,
    `courseId` VARCHAR(36) NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `tentorId`(`tentorId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `universities` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NULL,
    `code` VARCHAR(50) NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userHasRoles` (
    `id` VARCHAR(36) NOT NULL,
    `roleId` VARCHAR(36) NULL,
    `userId` VARCHAR(36) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `roleId`(`roleId`),
    INDEX `userCreate`(`userCreate`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(150) NULL,
    `email` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `token` TEXT NULL,
    `refreshToken` TEXT NULL,
    `roleId` VARCHAR(36) NULL,
    `userType` ENUM('admin', 'tentor') NULL,
    `nickname` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `phone` VARCHAR(15) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `roleId`(`roleId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `class` ADD CONSTRAINT `class_ibfk_2` FOREIGN KEY (`classTypeId`) REFERENCES `classTypes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `class` ADD CONSTRAINT `class_ibfk_3` FOREIGN KEY (`useraCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `classTypes` ADD CONSTRAINT `classtypes_ibfk_1` FOREIGN KEY (`useraCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `guidanceTypes` ADD CONSTRAINT `guidancetypes_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `locations` ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `majors` ADD CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`universityId`) REFERENCES `universities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `majors` ADD CONSTRAINT `majors_ibfk_2` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_ibfk_2` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `payrollDetails` ADD CONSTRAINT `payrolldetails_ibfk_1` FOREIGN KEY (`payrollId`) REFERENCES `payrolls`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payrollDetails` ADD CONSTRAINT `payrolldetails_ibfk_2` FOREIGN KEY (`scheduleId`) REFERENCES `schedules`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `payrollDetails` ADD CONSTRAINT `payrolldetails_ibfk_3` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `payrolls` ADD CONSTRAINT `payrolls_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `payrolls` ADD CONSTRAINT `payrolls_ibfk_2` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `permissionNames` ADD CONSTRAINT `permissionnames_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `recordMateri` ADD CONSTRAINT `recordmateri_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recordMateri` ADD CONSTRAINT `recordmateri_ibfk_2` FOREIGN KEY (`materiId`) REFERENCES `materials`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `recordMateri` ADD CONSTRAINT `recordmateri_ibfk_3` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `class`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_3` FOREIGN KEY (`university`) REFERENCES `universities`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_4` FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_5` FOREIGN KEY (`packageId`) REFERENCES `packages`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_6` FOREIGN KEY (`guidanceTypeId`) REFERENCES `guidanceTypes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_7` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_8` FOREIGN KEY (`schoolYearId`) REFERENCES `schoolYears`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registers` ADD CONSTRAINT `registers_ibfk_9` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `roleHasPermissions` ADD CONSTRAINT `rolehaspermissions_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `roleHasPermissions` ADD CONSTRAINT `rolehaspermissions_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roleHasPermissions` ADD CONSTRAINT `rolehaspermissions_ibfk_3` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`useraCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`studyGroupId`) REFERENCES `studyGroups`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`tentorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_ibfk_4` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_ibfk_5` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `schoolYears` ADD CONSTRAINT `schoolyears_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `studyGroupDetails` ADD CONSTRAINT `studygroupdetails_ibfk_1` FOREIGN KEY (`studyGroupId`) REFERENCES `studyGroups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studyGroupDetails` ADD CONSTRAINT `studygroupdetails_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `studyGroupDetails` ADD CONSTRAINT `studygroupdetails_ibfk_3` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `studyGroups` ADD CONSTRAINT `studygroups_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `class`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `studyGroups` ADD CONSTRAINT `studygroups_ibfk_2` FOREIGN KEY (`guidanceTypeId`) REFERENCES `guidanceTypes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `studyGroups` ADD CONSTRAINT `studygroups_ibfk_3` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `tentorNotAvailable` ADD CONSTRAINT `tentornotavailable_ibfk_1` FOREIGN KEY (`tentorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tentorNotAvailable` ADD CONSTRAINT `tentornotavailable_ibfk_2` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `tentorSkills` ADD CONSTRAINT `tentorskills_ibfk_1` FOREIGN KEY (`tentorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tentorSkills` ADD CONSTRAINT `tentorskills_ibfk_2` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `universities` ADD CONSTRAINT `universities_ibfk_1` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `userHasRoles` ADD CONSTRAINT `userhasroles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userHasRoles` ADD CONSTRAINT `userhasroles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userHasRoles` ADD CONSTRAINT `userhasroles_ibfk_3` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

