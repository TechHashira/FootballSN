import {MigrationInterface, QueryRunner} from "typeorm";

export class Mig101RefereeManyToManyTournaments1618390717805 implements MigrationInterface {
    name = 'Mig101RefereeManyToManyTournaments1618390717805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "referee_tournaments_tournament" ("refereeRefereeId" uuid NOT NULL, "tournamentTournamentId" uuid NOT NULL, CONSTRAINT "PK_a391cbe1f436ee4e6bc9a5551e6" PRIMARY KEY ("refereeRefereeId", "tournamentTournamentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e6b703691713b6acac3122c3d" ON "referee_tournaments_tournament" ("refereeRefereeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea386754f11eb12e8443ce28dd" ON "referee_tournaments_tournament" ("tournamentTournamentId") `);
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
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referee_tournaments_tournament" ADD CONSTRAINT "FK_6e6b703691713b6acac3122c3df" FOREIGN KEY ("refereeRefereeId") REFERENCES "referee"("refereeId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referee_tournaments_tournament" ADD CONSTRAINT "FK_ea386754f11eb12e8443ce28dd0" FOREIGN KEY ("tournamentTournamentId") REFERENCES "tournament"("tournamentId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "referee_tournaments_tournament" DROP CONSTRAINT "FK_ea386754f11eb12e8443ce28dd0"`);
        await queryRunner.query(`ALTER TABLE "referee_tournaments_tournament" DROP CONSTRAINT "FK_6e6b703691713b6acac3122c3df"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-14 08:10:17.666667'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-14 08:10:17.666667'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-14 08:10:17.666667'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-14 08:10:17.666667'`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_ea386754f11eb12e8443ce28dd"`);
        await queryRunner.query(`DROP INDEX "IDX_6e6b703691713b6acac3122c3d"`);
        await queryRunner.query(`DROP TABLE "referee_tournaments_tournament"`);
    }

}
