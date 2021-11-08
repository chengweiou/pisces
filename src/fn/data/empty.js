import { clone } from '@/fn'
const map = {}

const detail = {
  account: { username: '', password: '' },
  person: { id: 0, type: 'GUEST', name: '', phone: '', createAt: '', updateAt: ''},
  pet: { id: 0, person: {id: 0}, name: '', type: '', age: 0 },
}

createMap()
function createMap() {
  Object.keys(detail).map(k => {
    map[k] = () => clone(detail[k])
  })
}
export default map
