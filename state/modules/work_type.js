import QueryString from 'query-string';
import {baseUrl} from '/env.js'
const work = {
  namespaced: true,
  state: {
    data: [], // 兼职类型列表
    currentPage: 1,
    total: 0,
    perPage: 15,
    lastPage: 1,
    query: {
      size: 5,
      page: 1
    }
  },
  mutations: {
    setFilter: function (state, filter) {
      state.query['filters[' + filter.name + ']'] = filter.value
    },
    setData: function (state, data) {
      state.data = data
    },
    setTotal: function (state, total) {
      state.total = total
    },
    removeFilter: function (state, name) {
      delete state.query['filters[' + name + ']']
    },
    setLastPage: function (state, page) {
      state.lastPage = page
    },
    setQuery: function (state, query) {
      state.query[query.name] = query.value
    },
    removeQuery: function (state, name) {
      delete state.query[name]
    },
    setCurrentPage: function (state, page) {
      state.currentPage = page
    }
  },
  getters: {
    size: function (state) {
      return state.query.size
    }
  },
  actions: {
    /**
     * 获取兼职分类列表
     * @param state
     * @param commit
     * @param options
     */
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
   }
  }
};

export default work
