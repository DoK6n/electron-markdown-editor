/**
 * exposeInMainWorld의 key부분에 추가할 항목
 */
interface Exposed {
  readonly nodeCrypto: Readonly<typeof import('./src/nodeCrypto').nodeCrypto>;
  readonly versions: Readonly<typeof import('./src/versions').versions>;
  readonly electron: Readonly<typeof import('./src/api').electron>;
}

interface Window extends Exposed {}
