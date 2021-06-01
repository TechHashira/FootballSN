import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefereeAndCollaboratorModified1622536943012
  implements MigrationInterface {
  name = 'RefereeAndCollaboratorModified1622536943012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coach" DROP CONSTRAINT "FK_3c0ccc147b1b82b02090328afaa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_c0f5817c588e12d08512b36eefa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" DROP CONSTRAINT "FK_118d36f8998206463ffdb6c13bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" RENAME COLUMN "playerId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" RENAME CONSTRAINT "REL_118d36f8998206463ffdb6c13b" TO "UQ_6697d3317bea5e6b6f1b091b20c"`,
    );
    await queryRunner.query(
      `CREATE TABLE "collaborator" ("collaboratorId" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_d4c924638187957602b253bf8d5" PRIMARY KEY ("collaboratorId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "collaborator_matches_match" ("collaboratorCollaboratorId" uuid NOT NULL, "matchMatchId" uuid NOT NULL, CONSTRAINT "PK_bc735cee94b9e452181f65f8491" PRIMARY KEY ("collaboratorCollaboratorId", "matchMatchId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a70e1100a9920eba76bd0385cf" ON "collaborator_matches_match" ("collaboratorCollaboratorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9ce53bd81b5ca19d86c7f4ddae" ON "collaborator_matches_match" ("matchMatchId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "referee_matches_match" ("refereeRefereeId" uuid NOT NULL, "matchMatchId" uuid NOT NULL, CONSTRAINT "PK_d878e65e502d00d67c9c57cbcfb" PRIMARY KEY ("refereeRefereeId", "matchMatchId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3a9b1f357bcdc7f59cf544a602" ON "referee_matches_match" ("refereeRefereeId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eff8df1aee651587e898397dee" ON "referee_matches_match" ("matchMatchId") `,
    );
    await queryRunner.query(`ALTER TABLE "user_table" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."user_table_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "coach" DROP CONSTRAINT "REL_3c0ccc147b1b82b02090328afa"`,
    );
    await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "playerId"`);
    await queryRunner.query(
      `ALTER TABLE "match" DROP COLUMN "match_history_id"`,
    );
    await queryRunner.query(
      `CREATE TYPE "notification_type_enum" AS ENUM('PLAYER2TEAM', 'TEAM2PLAYER', 'REACTION', 'TEAM2TOURNAMENT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD "type" "notification_type_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "notification" ADD "subjectId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "notification" ADD "subjectObjectiveId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD "date" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD "place" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "match" ADD "journeyJourneyId" uuid`);
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
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_8631fcca88ce35634715b21e8a4" FOREIGN KEY ("journeyJourneyId") REFERENCES "journey"("journeyId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" ADD CONSTRAINT "FK_6697d3317bea5e6b6f1b091b20c" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborator_matches_match" ADD CONSTRAINT "FK_a70e1100a9920eba76bd0385cf5" FOREIGN KEY ("collaboratorCollaboratorId") REFERENCES "collaborator"("collaboratorId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborator_matches_match" ADD CONSTRAINT "FK_9ce53bd81b5ca19d86c7f4ddae4" FOREIGN KEY ("matchMatchId") REFERENCES "match"("matchId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee_matches_match" ADD CONSTRAINT "FK_3a9b1f357bcdc7f59cf544a6023" FOREIGN KEY ("refereeRefereeId") REFERENCES "referee"("refereeId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee_matches_match" ADD CONSTRAINT "FK_eff8df1aee651587e898397dee4" FOREIGN KEY ("matchMatchId") REFERENCES "match"("matchId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "referee_matches_match" DROP CONSTRAINT "FK_eff8df1aee651587e898397dee4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee_matches_match" DROP CONSTRAINT "FK_3a9b1f357bcdc7f59cf544a6023"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborator_matches_match" DROP CONSTRAINT "FK_9ce53bd81b5ca19d86c7f4ddae4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collaborator_matches_match" DROP CONSTRAINT "FK_a70e1100a9920eba76bd0385cf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" DROP CONSTRAINT "FK_6697d3317bea5e6b6f1b091b20c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" DROP CONSTRAINT "FK_8631fcca88ce35634715b21e8a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "team"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_table"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-05-20 07:11:54.153846'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-05-20 07:11:54.153846'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "match" DROP COLUMN "journeyJourneyId"`,
    );
    await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "place"`);
    await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "notification" DROP COLUMN "subjectObjectiveId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP COLUMN "subjectId"`,
    );
    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "notification_type_enum"`);
    await queryRunner.query(`ALTER TABLE "match" ADD "match_history_id" uuid`);
    await queryRunner.query(`ALTER TABLE "coach" ADD "playerId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "coach" ADD CONSTRAINT "REL_3c0ccc147b1b82b02090328afa" UNIQUE ("playerId")`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_table_role_enum" AS ENUM('ADMIN', 'PLAYER', 'SPECTATOR', 'COACH', 'REFEREE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_table" ADD "role" "user_table_role_enum" NOT NULL`,
    );
    await queryRunner.query(`DROP INDEX "IDX_eff8df1aee651587e898397dee"`);
    await queryRunner.query(`DROP INDEX "IDX_3a9b1f357bcdc7f59cf544a602"`);
    await queryRunner.query(`DROP TABLE "referee_matches_match"`);
    await queryRunner.query(`DROP INDEX "IDX_9ce53bd81b5ca19d86c7f4ddae"`);
    await queryRunner.query(`DROP INDEX "IDX_a70e1100a9920eba76bd0385cf"`);
    await queryRunner.query(`DROP TABLE "collaborator_matches_match"`);
    await queryRunner.query(`DROP TABLE "collaborator"`);
    await queryRunner.query(
      `ALTER TABLE "referee" RENAME CONSTRAINT "UQ_6697d3317bea5e6b6f1b091b20c" TO "REL_118d36f8998206463ffdb6c13b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" RENAME COLUMN "userId" TO "playerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referee" ADD CONSTRAINT "FK_118d36f8998206463ffdb6c13bb" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "match" ADD CONSTRAINT "FK_c0f5817c588e12d08512b36eefa" FOREIGN KEY ("match_history_id") REFERENCES "match_history"("match_history_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coach" ADD CONSTRAINT "FK_3c0ccc147b1b82b02090328afaa" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
