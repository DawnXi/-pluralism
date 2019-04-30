// 添加分类列表
export const register = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}
// 更新分类列表
export const register = (data) => {
    return uni.request({
        url: `/refund/${data.id}`,
        data,
        method: 'POST'
    })
}
// 删除分类列表
export const register = (id) => {
    return uni.request({
        url: `/refund/${id}`,
        data,
        method: 'POST'
    })
}
