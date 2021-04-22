import {MigrationInterface, QueryRunner} from "typeorm";

export class MigSeasonState1619106968349 implements MigrationInterface {
    name = 'MigSeasonState1619106968349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_6d351a8a12107add4e6e9bef2ca"`);
        await queryRunner.query(`ALTER TABLE "season" RENAME COLUMN "tournamentTournamentId" TO "tournamentId"`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`COMMENT ON COLUMN "notification"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_ec9b91b8403e0553a754f0a37b8" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_ec9b91b8403e0553a754f0a37b8"`);
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 15:22:19.317365'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 15:22:19.317365'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 15:22:19.317365'`);
        await queryRunner.query(`COMMENT ON COLUMN "notification"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-22 15:22:19.317365'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-22 15:22:19.317365'`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "season" RENAME COLUMN "tournamentId" TO "tournamentTournamentId"`);
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_6d351a8a12107add4e6e9bef2ca" FOREIGN KEY ("tournamentTournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
