import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThirdMig1617695367673 implements MigrationInterface {
  name = 'ThirdMig1617695367673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."profilePath" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "profilePath" SET DEFAULT 'profile.jpg'`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" SET DEFAULT null`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contract" DROP CONSTRAINT "FK_bef91905671a24464cc876f7dc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ALTER COLUMN "contract_worksheet_id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "contract"."contract_worksheet_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ADD CONSTRAINT "FK_bef91905671a24464cc876f7dc1" FOREIGN KEY ("contract_worksheet_id") REFERENCES "contract_worksheet"("contract_worksheet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "profilePath" DROP DEFAULT`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."profilePath" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:11:37.345023'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:11:37.345023'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-06 07:11:37.345023'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-06 07:11:37.345023'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
  }
}
