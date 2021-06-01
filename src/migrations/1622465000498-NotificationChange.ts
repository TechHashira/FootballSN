import {MigrationInterface, QueryRunner} from "typeorm";

export class NotificationChange1622465000498 implements MigrationInterface {
    name = 'NotificationChange1622465000498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('PLAYER2TEAM', 'TEAM2PLAYER', 'REACTION', 'TEAM2TOURNAMENT')`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "type" "notification_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "subjectId" uuid`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "subjectObjectiveId" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`);
        await queryRunner.query(`COMMENT ON COLUMN "notification"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-05-20 07:11:54.153846'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`);
        await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "subjectObjectiveId"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "subjectId"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum"`);
    }

}
