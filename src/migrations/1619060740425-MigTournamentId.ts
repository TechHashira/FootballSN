import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigTournamentId1619060740425 implements MigrationInterface {
  name = 'MigTournamentId1619060740425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_6c381b833f42438bdf2206f47bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "tournamentId" DROP NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "team"."tournamentId" IS NULL`);
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
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_6c381b833f42438bdf2206f47bd" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_6c381b833f42438bdf2206f47bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 03:03:19.683187'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_table"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 03:03:19.683187'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 03:03:19.683187'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-22 03:03:19.683187'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 03:03:19.683187'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "team"."tournamentId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "tournamentId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_6c381b833f42438bdf2206f47bd" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
