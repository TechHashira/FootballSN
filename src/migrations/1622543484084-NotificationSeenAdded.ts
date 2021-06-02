import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotificationSeenAdded1622543484084 implements MigrationInterface {
  name = 'NotificationSeenAdded1622543484084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" RENAME COLUMN "checked" TO "seen"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_table"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 08:42:49.186786'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 08:42:49.186786'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_table"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 08:42:49.186786'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 08:42:49.186786'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-06-01 08:42:49.186786'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 08:42:49.186786'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "notification" RENAME COLUMN "seen" TO "checked"`,
    );
  }
}
