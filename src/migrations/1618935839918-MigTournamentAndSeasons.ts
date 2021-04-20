import {MigrationInterface, QueryRunner} from "typeorm";

export class MigTournamentAndSeasons1618935839918 implements MigrationInterface {
    name = 'MigTournamentAndSeasons1618935839918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournament" ADD "timeOfEachHalf" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tournament" ADD "maxOfPlayersOnCourtPerTeam" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tournament" ADD "maxOfPlayersRegisteredPerTeam" smallint NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`);
        await queryRunner.query(`COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-20 12:05:52.195586'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_table"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-20 12:05:52.195586'`);
        await queryRunner.query(`COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-20 12:05:52.195586'`);
        await queryRunner.query(`COMMENT ON COLUMN "notification"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-20 12:05:52.195586'`);
        await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-20 12:05:52.195586'`);
        await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "maxOfPlayersRegisteredPerTeam"`);
        await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "maxOfPlayersOnCourtPerTeam"`);
        await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "timeOfEachHalf"`);
    }

}
