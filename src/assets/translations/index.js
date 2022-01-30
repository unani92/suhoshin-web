// ROUTE-SPECIFIC
import common from './common'

const result = {}
const translations = [common]
translations.forEach(json =>
    Object.keys(json).forEach(key => {
        result[key] = json[key]
    })
)

export default result
