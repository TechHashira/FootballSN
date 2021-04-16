import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigFcmColumnUnique1618584888643 implements MigrationInterface {
  name = 'MigFcmColumnUnique1618584888643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device" RENAME COLUMN "fmc_token" TO "fcm_token"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" RENAME CONSTRAINT "UQ_49281da3e0d9f4da60d58f30920" TO "UQ_3c4ed5801431490290b69c78c62"`,
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
      `ALTER TABLE "user_table" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-16 14:38:46.365006'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user_table"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth_forgotten_passwords" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-16 14:38:46.365006'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users_auth_forgotten_passwords"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-16 14:38:46.365006'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "notification"."createdAt" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "likeAt" SET DEFAULT '2021-04-16 14:38:46.365006'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "likes"."likeAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "createdAt" SET DEFAULT '2021-04-16 14:38:46.365006'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "news"."createdAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "device" RENAME CONSTRAINT "UQ_3c4ed5801431490290b69c78c62" TO "UQ_49281da3e0d9f4da60d58f30920"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" RENAME COLUMN "fcm_token" TO "fmc_token"`,
    );
  }
}
