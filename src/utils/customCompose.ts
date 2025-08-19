type HOC = <T extends object>(Component: React.ComponentType<T>) => React.ComponentType<T>;

export const customCompose =
    (...hocs: HOC[]) =>
        <T extends object>(Component: React.ComponentType<T>) =>
            hocs.reduceRight((acc, hoc) => hoc(acc), Component);