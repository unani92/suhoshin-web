// ROUTE-SPECIFIC
import common from './common'
import post from './routes/post.json'

const result = {}
const translations = [common, post]
translations.forEach(json =>
    Object.keys(json).forEach(key => {
        result[key] = json[key]
    })
)

export default result
