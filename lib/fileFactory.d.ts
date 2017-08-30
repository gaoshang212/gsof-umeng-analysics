export declare class fileFactory {
    static load<T>(filename: string): Promise<T>;
    static save<T>(t: T, filename: string): Promise<void>;
}
