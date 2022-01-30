// 핵클 설정
import * as Hackle from '@hackler/js-client-sdk'

const key =
    process.env.NODE_ENV === 'production' ? 'oUvxyrB526B7hx7T89wBTcyD2yRj2TE8' : 'KuHgG8O05SOE1tnnt4jmKtYWtQ6daRGS'

export const hackleClient = Hackle.createInstance(key)
