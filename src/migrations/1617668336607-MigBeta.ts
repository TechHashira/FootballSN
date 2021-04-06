import {MigrationInterface, QueryRunner} from "typeorm";

export class MigBeta1617668336607 implements MigrationInterface {
    name = 'MigBeta1617668336607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("newsId" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT null, "text" character varying NOT NULL, "imgPath" character varying NOT NULL, "adminId" uuid, "news_wall_id" uuid, CONSTRAINT "REL_416832097e4dc483a1e1395162" UNIQUE ("adminId"), CONSTRAINT "PK_b5589be2edde9e2a404d413c35b" PRIMARY KEY ("newsId"))`);
        await queryRunner.query(`CREATE TABLE "news_wall" ("news_wall_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tournamentId" uuid, CONSTRAINT "REL_130aa485f51ff169cf2ba58856" UNIQUE ("tournamentId"), CONSTRAINT "PK_a5eeae2cf34f2d2678fe4ad89db" PRIMARY KEY ("news_wall_id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("likeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "likeAt" TIMESTAMP WITH TIME ZONE NOT NULL, "newsId" uuid, "userId" uuid, CONSTRAINT "PK_f1adfd27aaa74667194baab8318" PRIMARY KEY ("likeId"))`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`);
        await queryRunner.query(`COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_416832097e4dc483a1e13951627" FOREIGN KEY ("adminId") REFERENCES "admin"("adminId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_28137d7c69b8f3ab5a0871c3f54" FOREIGN KEY ("news_wall_id") REFERENCES "news_wall"("news_wall_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_wall" ADD CONSTRAINT "FK_130aa485f51ff169cf2ba58856d" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("tournamentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_895dfb4af021cd59efe826a2999" FOREIGN KEY ("newsId") REFERENCES "news"("newsId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_895dfb4af021cd59efe826a2999"`);
        await queryRunner.query(`ALTER TABLE "news_wall" DROP CONSTRAINT "FK_130aa485f51ff169cf2ba58856d"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_28137d7c69b8f3ab5a0871c3f54"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_416832097e4dc483a1e13951627"`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "news_wall"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
