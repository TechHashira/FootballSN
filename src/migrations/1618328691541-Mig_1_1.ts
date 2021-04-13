import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig111618328691541 implements MigrationInterface {
    name = 'Mig111618328691541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_0d8640b1738714b761d22c1ab83"`);
        await queryRunner.query(`CREATE TABLE "referee" ("refereeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_6697d3317bea5e6b6f1b091b20" UNIQUE ("userId"), CONSTRAINT "PK_32969459d263cd8038437276f15" PRIMARY KEY ("refereeId"))`);
        await queryRunner.query(`CREATE TABLE "match_stats_by_team" ("match_stats_by_team_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shots" smallint, "shots_on_target" smallint, "possession" smallint, "pass_accuary" smallint, "fouls" smallint, "yellow_cards" smallint, "red_cards" smallint, "offsides" smallint, "corners" smallint, "teamId" uuid, "matchId" uuid, CONSTRAINT "PK_828c2c3c3bd02f2179f135f0aa3" PRIMARY KEY ("match_stats_by_team_id"))`);
        await queryRunner.query(`CREATE TABLE "match_history" ("match_history_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP WITH TIME ZONE, "journeyId" uuid, "refereeRefereeId" uuid, CONSTRAINT "PK_7af3d84c1c4730c6b1145a8cfde" PRIMARY KEY ("match_history_id"))`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "match_data"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "journeyId"`);
        await queryRunner.query(`ALTER TABLE "team_stats" ADD "matchId" uuid`);
        await queryRunner.query(`ALTER TABLE "match" ADD "match_history_id" uuid`);
        await queryRunner.query(`ALTER TABLE "match" ADD "teamId" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`);
        await queryRunner.query(`COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "referee" ADD CONSTRAINT "FK_6697d3317bea5e6b6f1b091b20c" FOREIGN KEY ("userId") REFERENCES "user_table"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_stats_by_team" ADD CONSTRAINT "FK_754dcaa968d253e0ba56e43de31" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_stats_by_team" ADD CONSTRAINT "FK_35406533ea29d5397b7d1d45dfa" FOREIGN KEY ("matchId") REFERENCES "match"("matchId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_stats" ADD CONSTRAINT "FK_9ea2fbb44692829dd9db93cfeee" FOREIGN KEY ("matchId") REFERENCES "match"("matchId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_c0f5817c588e12d08512b36eefa" FOREIGN KEY ("match_history_id") REFERENCES "match_history"("match_history_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_f2d690b3cd42934a851294a40e3" FOREIGN KEY ("teamId") REFERENCES "team"("teamId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_history" ADD CONSTRAINT "FK_e6016a66f7bc28d043e63c6e1c3" FOREIGN KEY ("journeyId") REFERENCES "journey"("journeyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_history" ADD CONSTRAINT "FK_2ec243afc9c3b353060f2eda60b" FOREIGN KEY ("refereeRefereeId") REFERENCES "referee"("refereeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_history" DROP CONSTRAINT "FK_2ec243afc9c3b353060f2eda60b"`);
        await queryRunner.query(`ALTER TABLE "match_history" DROP CONSTRAINT "FK_e6016a66f7bc28d043e63c6e1c3"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_f2d690b3cd42934a851294a40e3"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_c0f5817c588e12d08512b36eefa"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`);
        await queryRunner.query(`ALTER TABLE "team_stats" DROP CONSTRAINT "FK_9ea2fbb44692829dd9db93cfeee"`);
        await queryRunner.query(`ALTER TABLE "match_stats_by_team" DROP CONSTRAINT "FK_35406533ea29d5397b7d1d45dfa"`);
        await queryRunner.query(`ALTER TABLE "match_stats_by_team" DROP CONSTRAINT "FK_754dcaa968d253e0ba56e43de31"`);
        await queryRunner.query(`ALTER TABLE "referee" DROP CONSTRAINT "FK_6697d3317bea5e6b6f1b091b20c"`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:55:14.508167'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:55:14.508167'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-06 07:55:14.508167'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:55:14.508167'`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "teamId"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "match_history_id"`);
        await queryRunner.query(`ALTER TABLE "team_stats" DROP COLUMN "matchId"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "journeyId" uuid`);
        await queryRunner.query(`ALTER TABLE "match" ADD "match_data" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD "start_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`DROP TABLE "match_history"`);
        await queryRunner.query(`DROP TABLE "match_stats_by_team"`);
        await queryRunner.query(`DROP TABLE "referee"`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_0d8640b1738714b761d22c1ab83" FOREIGN KEY ("journeyId") REFERENCES "journey"("journeyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
