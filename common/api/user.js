import fly from 'fly'
// 添加兼职评论
export const addComment = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}
// 修改兼职评论
export const putComment = (data) => {
    return uni.request({
        url: `/refund/${data.id}`,
        data,
        method: 'POST'
    })
}
// 删除兼职评论
export const deleteComment = (id) => {
    return uni.request({
        url: `/refund/${id}`,
        method: 'POST'
    })
}
// 收藏兼职
export const addCollect = (data) => {
    return uni.request({
        url: `/refund/${data.id}`,
        data,
        method: 'POST'
    })
}

// 取消收藏
export const deleteCollect = (id) => {
    return uni.request({
        url: `/refund/${id}`,
        method: 'POST'
    })
}


// 添加兼职
export const addWork = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}

// 更新兼职
export const putWork = (data) => {
    return uni.request({
        url: `/refund/${data.id}`,
        data,
        method: 'POST'
    })
}

// 删除兼职
export const deleteWork = (id) => {
    return uni.request({
        url: `/refund/${id}`,
        data,
        method: 'POST'
    })
}

// 上传图片
export const uploadImg = (data) => {
    return fly.request({
        url: `/upload-img`,
        data,
        method: 'POST'
    })
}