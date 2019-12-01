/**
 * 本地存储，数据持久化
*/

// 存储本地数据
export const setItem = (name, value) => window.localStorage.setItem(name, value)

// 获取本地数据
export const getItem = (name) => window.localStorage.getItem(name)

// 清除本地数据
export const removeItem = (name) => window.localStorage.removeItem(name)
