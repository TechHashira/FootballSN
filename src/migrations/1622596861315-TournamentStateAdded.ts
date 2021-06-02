import { MigrationInterface, QueryRunner } from 'typeorm';

export class TournamentStateAdded1622596861315 implements MigrationInterface {
  name = 'TournamentStateAdded1622596861315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" RENAME COLUMN "invitation_code" TO "tournament_state"`,
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
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."notification_type_enum" RENAME TO "notification_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "notification_type_enum" AS ENUM('PLAYER2TEAM', 'TEAM2PLAYER', 'REACTION', 'TEAM2TOURNAMENT', 'TOURNAMENT2TEAM')`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum" USING "type"::"text"::"notification_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "notification_type_enum_old"`);
    await queryRunner.query(`COMMENT ON COLUMN "notification"."type" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "userId" SET NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."userId" IS NULL`,
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
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP COLUMN "tournament_state"`,
    );
    await queryRunner.query(
      `CREATE TYPE "tournament_tournament_state_enum" AS ENUM('PRIVATE', 'PUBLIC', 'SEMIPUBLIC')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "tournament_state" "tournament_tournament_state_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP COLUMN "tournament_state"`,
    );
    await queryRunner.query(`DROP TYPE "tournament_tournament_state_enum"`);
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "tournament_state" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 10:34:37.538773'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 10:34:37.538773'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_table"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 10:34:37.538773'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."userId" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "userId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 10:34:37.538773'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."createdAt" IS NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "notification"."type" IS NULL`);
    await queryRunner.query(
      `CREATE TYPE "notification_type_enum_old" AS ENUM('PLAYER2TEAM', 'TEAM2PLAYER', 'REACTION', 'TEAM2TOURNAMENT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum_old" USING "type"::"text"::"notification_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "notification_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "notification_type_enum_old" RENAME TO  "notification_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-06-01 10:34:37.538773'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-01 10:34:37.538773'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "tournament" RENAME COLUMN "tournament_state" TO "invitation_code"`,
    );
  }
}
