import {MigrationInterface, QueryRunner} from "typeorm";

export class CoachUserId1622611952656 implements MigrationInterface {
    name = 'CoachUserId1622611952656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coach" ADD CONSTRAINT "UQ_b41c508e2dacfe91a064b5b98f6" UNIQUE ("userId")`);
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
        await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "coach" ADD CONSTRAINT "FK_b41c508e2dacfe91a064b5b98f6" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" DROP CONSTRAINT "FK_b41c508e2dacfe91a064b5b98f6"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-02 01:25:20.690799'`);
        await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-02 01:25:20.690799'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-02 01:25:20.690799'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-02 01:25:20.690799'`);
        await queryRunner.query(`COMMENT ON COLUMN "notification"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-06-02 01:25:20.690799'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-02 01:25:20.690799'`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "coach" DROP CONSTRAINT "UQ_b41c508e2dacfe91a064b5b98f6"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "userId"`);
    }

}
