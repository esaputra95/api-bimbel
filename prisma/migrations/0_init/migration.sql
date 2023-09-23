-- CreateTable
CREATE TABLE `brands` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `brandStore`(`storeId`),
    INDEX `brandUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `categoriStore`(`storeId`),
    INDEX `categoriUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `memberLevels` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `name` VARCHAR(100) NOT NULL,
    `level` SMALLINT NOT NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `memberLevelStore`(`storeId`),
    INDEX `userCreate`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `memberLevelId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(16) NULL,
    `address` TEXT NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `memberLevel`(`memberLevelId`),
    INDEX `memberStore`(`storeId`),
    INDEX `memberUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productConversions` (
    `id` VARCHAR(36) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,
    `unitId` VARCHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `status` SMALLINT NULL DEFAULT 1,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `productConversionProduct`(`productId`),
    INDEX `productConversionUnit`(`unitId`),
    INDEX `productConversionUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productVariants` (
    `id` VARCHAR(36) NOT NULL,
    `variantId` VARCHAR(36) NOT NULL,
    `conversionId` VARCHAR(36) NOT NULL,
    `price` DECIMAL(14, 4) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `productVariantConversion`(`conversionId`),
    INDEX `productVariantUser`(`userCreate`),
    INDEX `productVariantVariant`(`variantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `categoriId` VARCHAR(36) NOT NULL,
    `brandId` VARCHAR(36) NOT NULL,
    `code` VARCHAR(50) NULL,
    `name` VARCHAR(255) NOT NULL,
    `hppType` VARCHAR(15) NULL,
    `taxInclude` SMALLINT NULL,
    `stockMinimum` INTEGER NULL,
    `description` TEXT NULL,
    `status` ENUM('active', 'non-active') NULL DEFAULT 'active',
    `image` TEXT NULL,
    `type` ENUM('item', 'material', 'formula', 'package', 'service', 'cost') NULL,
    `consignment` INTEGER NULL,
    `consignmentType` ENUM('in', 'out') NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `productBrand`(`brandId`),
    INDEX `productCategori`(`categoriId`),
    INDEX `productStore`(`storeId`),
    INDEX `productUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseDetails` (
    `id` VARCHAR(36) NOT NULL,
    `purchaseId` VARCHAR(36) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,
    `variantId` VARCHAR(36) NULL,
    `quantityOrder` DECIMAL(14, 4) NULL,
    `quantity` DECIMAL(14, 4) NULL,
    `price` DECIMAL(14, 4) NULL,
    `discount` DECIMAL(14, 4) NULL,
    `total` DECIMAL(14, 4) NULL,
    `expiredDate` DATE NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `purchaseDetailProduct`(`productId`),
    INDEX `purchaseDetailPurchase`(`purchaseId`),
    INDEX `purchaseDetailUser`(`userCreate`),
    INDEX `purchaseDetailVariant`(`variantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchases` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `supplierId` VARCHAR(36) NOT NULL,
    `purchaseOrderId` VARCHAR(36) NULL,
    `date` DATE NOT NULL,
    `invoice` VARCHAR(100) NOT NULL,
    `subTotal` DECIMAL(14, 4) NULL,
    `tax` DECIMAL(14, 4) NULL,
    `discount` DECIMAL(14, 4) NULL,
    `addtionalCost` DECIMAL(14, 4) NULL,
    `total` DECIMAL(14, 4) NULL,
    `downPayment` DECIMAL(14, 4) NULL,
    `payCash` DECIMAL(14, 4) NULL,
    `payCredit` DECIMAL(14, 4) NULL,
    `payMetodeId` VARCHAR(36) NULL,
    `accountCashId` VARCHAR(36) NULL,
    `accountDebitId` VARCHAR(36) NULL,
    `accountCreditId` VARCHAR(36) NULL,
    `accountDownPaymentId` VARCHAR(36) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `purchaseStore`(`storeId`),
    INDEX `purchaseSupplier`(`supplierId`),
    INDEX `purchaseUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saleDetails` (
    `id` VARCHAR(36) NOT NULL,
    `saleId` VARCHAR(36) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,
    `variantId` VARCHAR(36) NULL,
    `quantityOrder` DECIMAL(14, 4) NULL,
    `quantity` DECIMAL(14, 4) NULL,
    `price` DECIMAL(14, 4) NULL,
    `discount` DECIMAL(14, 4) NULL,
    `total` DECIMAL(14, 4) NULL,
    `expiredDate` DATE NULL,
    `status` ENUM('ordered', 'cooking', 'cancle', 'served', 'finish') NULL DEFAULT 'ordered',
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `saleDetailProduct`(`productId`),
    INDEX `saleDetailSale`(`saleId`),
    INDEX `saleDetailUser`(`userCreate`),
    INDEX `saleDetailVariant`(`variantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `memberId` VARCHAR(36) NULL,
    `saleOrderId` VARCHAR(36) NULL,
    `date` DATE NULL,
    `invoice` VARCHAR(100) NULL,
    `subTotal` DECIMAL(14, 4) NULL,
    `tax` DECIMAL(14, 4) NULL,
    `discount` DECIMAL(14, 4) NULL,
    `addtionalCost` DECIMAL(14, 4) NULL,
    `total` DECIMAL(14, 4) NULL,
    `downPayment` DECIMAL(14, 4) NULL,
    `payCash` DECIMAL(14, 4) NULL,
    `payCredit` DECIMAL(14, 4) NULL,
    `payMetodeId` VARCHAR(36) NULL,
    `status` ENUM('ordered', 'finish') NULL DEFAULT 'ordered',
    `accountCashId` VARCHAR(36) NULL,
    `accountDebitId` VARCHAR(36) NULL,
    `accountCreditId` VARCHAR(36) NULL,
    `accountDownPaymentId` VARCHAR(36) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `saleMember`(`memberId`),
    INDEX `saleStore`(`storeId`),
    INDEX `saleUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `address` TEXT NULL,
    `expiredDate` DATETIME(0) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,
    `userCreate` VARCHAR(36) NULL,

    INDEX `storeUser`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `name` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `address` TEXT NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `supplierStore`(`storeId`),
    INDEX `supplierUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `unitStore`(`storeId`),
    INDEX `unitUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(15) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,
    `userCreate` VARCHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variants` (
    `id` VARCHAR(36) NOT NULL,
    `storeId` VARCHAR(36) NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `userCreate` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` DATETIME(0) NULL,

    INDEX `variantStore`(`storeId`),
    INDEX `variantUser`(`userCreate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `brands` ADD CONSTRAINT `brandStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `brands` ADD CONSTRAINT `brandUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categoriStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categoriUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `memberLevels` ADD CONSTRAINT `memberLevelStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `memberLevels` ADD CONSTRAINT `memberLevelUser` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `memberLevel` FOREIGN KEY (`memberLevelId`) REFERENCES `memberLevels`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `memberStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `memberUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `productConversions` ADD CONSTRAINT `productConversionProduct` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productConversions` ADD CONSTRAINT `productConversionUnit` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `productConversions` ADD CONSTRAINT `productConversionUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `productVariants` ADD CONSTRAINT `productVariantConversion` FOREIGN KEY (`conversionId`) REFERENCES `productConversions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productVariants` ADD CONSTRAINT `productVariantUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `productVariants` ADD CONSTRAINT `productVariantVariant` FOREIGN KEY (`variantId`) REFERENCES `variants`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `productBrand` FOREIGN KEY (`brandId`) REFERENCES `brands`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `productCategori` FOREIGN KEY (`categoriId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `productStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `productUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `purchaseDetails` ADD CONSTRAINT `purchaseDetailProduct` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `purchaseDetails` ADD CONSTRAINT `purchaseDetailPurchase` FOREIGN KEY (`purchaseId`) REFERENCES `purchases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDetails` ADD CONSTRAINT `purchaseDetailUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `purchaseDetails` ADD CONSTRAINT `purchaseDetailVariant` FOREIGN KEY (`variantId`) REFERENCES `variants`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchaseStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchaseSupplier` FOREIGN KEY (`supplierId`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `purchases` ADD CONSTRAINT `purchaseUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `saleDetails` ADD CONSTRAINT `saleDetailProduct` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `saleDetails` ADD CONSTRAINT `saleDetailSale` FOREIGN KEY (`saleId`) REFERENCES `sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `saleDetails` ADD CONSTRAINT `saleDetailUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `saleDetails` ADD CONSTRAINT `saleDetailVariant` FOREIGN KEY (`variantId`) REFERENCES `variants`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `saleMember` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `saleStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `saleUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `stores` ADD CONSTRAINT `storeUser` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suppliers` ADD CONSTRAINT `supplierStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `suppliers` ADD CONSTRAINT `supplierUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `units` ADD CONSTRAINT `unitStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `units` ADD CONSTRAINT `unitUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `variants` ADD CONSTRAINT `variantStore` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `variants` ADD CONSTRAINT `variantUser` FOREIGN KEY (`userCreate`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

