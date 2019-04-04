import config from '../../manifest'
const work_type = {
    // 查询分类列表
    get_type(options = {}) {
        uni.request({
            url: config.publicPatch + '/get_type',
            data: options.data || '',
            method: 'GET',
            header: {
                'custom-header': 'hello', //自定义请求头信息
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    if (options.success && typeof(options.success) === 'function') {
                        options.success(res.data);
                    }
                }
            },
            fail: (err) => {
                if (options.success && typeof(options.success) === 'function') {
                    options.success(err);
                }
            }
        });
    },
    // 添加分类列表
    add_type(options = {}) {
        uni.request({
            url: config.publicPatch + '/add_type',
            data: options.data || '',
            method: 'POST',
            header: {
                'custom-header': 'hello', //自定义请求头信息
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    if (options.success && typeof(options.success) === 'function') {
                        options.success(res.data);
                    }
                }
            },
            fail: (err) => {
                if (options.success && typeof(options.success) === 'function') {
                    options.success(err);
                }
            }
        });
    },
    // 更新分类列表
    put_type(options = {}) {
        uni.request({
            url: config.publicPatch + '/put_type',
            data: options.data || '',
            method: 'GET',
            header: {
                'custom-header': 'hello', //自定义请求头信息
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    if (options.success && typeof(options.success) === 'function') {
                        options.success(res.data);
                    }
                }
            },
            fail: (err) => {
                if (options.success && typeof(options.success) === 'function') {
                    options.success(err);
                }
            }
        });
    },
    // 删除分类列表
    delete_type(options = {}) {
        uni.request({
            url: config.publicPatch + '/delete_type',
            data: options.data || '',
            method: 'GET',
            header: {
                'custom-header': 'hello', //自定义请求头信息
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    if (options.success && typeof(options.success) === 'function') {
                        options.success(res.data);
                    }
                }
            },
            fail: (err) => {
                if (options.success && typeof(options.success) === 'function') {
                    options.success(err);
                }
            }
        });
    }
};

export default work_type;