// di_container.ts

type Constructor<T> = new (...args: any[]) => T;

export class DIContainer {
    private static _instance: DIContainer | null = null;
    private _registry = new Map<Constructor<any>, any>();

    private constructor() {}

    static get instance(): DIContainer {
        if (!this._instance) {
            this._instance = new DIContainer();
        }
        return this._instance;
    }

    register<T>(token: Constructor<T>, instance: T): this {
        this._registry.set(token, instance);
        return this;
    }

    get<T>(token: Constructor<T>): T {
        const instance = this._registry.get(token);
        if (!instance) {
            throw new Error(`Type ${token.name} is not registered.`);
        }
        return instance as T;
    }

    reset() {
        this._registry.clear();
    }
}

// 動作確認
export interface IFamilyService {
    sayHello(): void;
}

export class FamilyService implements IFamilyService {
    sayHello() {
        console.log("Hello from FamilyService!");
    }
}
class MockFamilyService implements IFamilyService {
    sayHello() {
        console.log("Hello from Mock!");
    }
}
if (import.meta.main) {
    DIContainer.instance.register(FamilyService, new MockFamilyService());

    // 取得
    const familyService = DIContainer.instance.get(FamilyService);
    familyService.sayHello();
}
