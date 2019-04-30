// 注册
export const register = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}

// 登录
export const login = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}

// 修改密码
export const putPassword = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}

// 忘记密码
export const forgetPassword = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}

// 上传信息
export const updateUserInfo = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}

// 修改信息
export const putUserInfo = (data) => {
    return uni.request({
        url: `/refund/`,
        data,
        method: 'POST'
    })
}