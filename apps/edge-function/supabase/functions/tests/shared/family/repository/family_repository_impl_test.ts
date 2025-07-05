import assert from "node:assert";
import { Family } from "../../../../family/domain/family.ts";
import { FamilyId } from "../../../../family/domain/value_object/family_id.ts";
import { FamilyEntity } from "../../../../family/infrastructure/entity/family_entity.ts";
import { FamilyDao } from "../../../../family/infrastructure/interface/family_dao.ts";
import { FamilyRepositoryImpl } from "../../../../family/repository/family_repository_impl.ts";
import { DIContainer } from "../../../../shared/di_container.ts";
import { UserId } from "../../../../user/domain/value_object/user_id.ts";

class MockFamilyDao implements FamilyDao {
    findByUserId(userId: string): Promise<FamilyEntity | null> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Array<FamilyEntity>> {
        return Promise.resolve([
            new FamilyEntity(
                1,
                "ユーザID",
                "home",
                new Date(2000, 0, 1),
                new Date(2000, 0, 1),
            ),
        ]);
    }
    findById(id: number): Promise<FamilyEntity | null> {
        return Promise.resolve(
            new FamilyEntity(
                1,
                "ユーザID",
                "home",
                new Date(2000, 0, 1),
                new Date(2000, 0, 1),
            ),
        );
    }
}

DIContainer.instance.register(FamilyDao, new MockFamilyDao());

Deno.test(async function findAll(t) {
    await t.step({
        name: "取得したentityをdomainに変換して返却できること",
        async fn() {
            const repo = new FamilyRepositoryImpl();
            const expected_family = new Family(
                new FamilyId(1),
                new UserId("ユーザID"),
                new Date(2000, 0, 1),
                new Date(2000, 0, 1),
            );
            const families = await repo.findAll();
            assert(families.length === 1);
            assert(families.first()?.equals(expected_family));
        },
    });
});

Deno.test(async function findById(t) {
    await t.step({
        name: "取得したentityをdomainに変換して返却できること",
        async fn() {
            const repo = new FamilyRepositoryImpl();
            const expected_family = new Family(
                new FamilyId(1),
                new UserId("ユーザID"),
                new Date(2000, 0, 1),
                new Date(2000, 0, 1),
            );
            const familyId = new FamilyId(1);
            const family = await repo.findById(familyId);
            assert(family!.equals(expected_family));
        },
    });
    await t.step({
        name: "entityがnullのとき、nullが返ること",
        async fn() {
            class MockFamilyDao implements FamilyDao {
                findByUserId(userId: string): Promise<FamilyEntity | null> {
                    throw new Error("Method not implemented.");
                }
                async findAll(): Promise<Array<FamilyEntity>> {
                    throw new Error("Method not implemented.");
                }
                findById(id: number): Promise<FamilyEntity | null> {
                    return Promise.resolve(null);
                }
            }
            DIContainer.instance.register(FamilyDao, new MockFamilyDao());
        },
    });
});
