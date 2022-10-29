export function convertChatType(val) {
  const chatType = new Map()

  chatType['regular'] = '일반'
  chatType['order'] = '지시'
  chatType['secret'] = '기밀'
  chatType['report'] = '보고'

  return chatType[val]
}
