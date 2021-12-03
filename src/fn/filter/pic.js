import site from '@/sdk/config/site'

const defaultOption = { local: false, empty: '' }
export default (v, option) => {
  option = { ...defaultOption, ...option }
  if (!v) return option.empty
  else if (v.indexOf('data:image/')==0) return v
  else if (option.local) return v
  else return site.mothallah + v
}
