export function convertUserType(val) {
  const userType = new Map()

  userType['leader'] = '지휘자'
  userType['commander'] = '지휘관'
  userType['soldier'] = '병사'

  return userType[val]
}
