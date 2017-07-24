
const initState = {
    cateList: [],    // 分类列表
    codeList: [],    // 展会编码列表
    cmsList:  [],    // 展会列表

    operation: {
        type: '',    // get / add / update / delete
        name: '',    // 中文名称
        res: true,   // 操作成功或失败
        msg: ''      // 错误信息
    }
};

function publicReducer(state = initState, action) {
    switch (action.type) {

        case 'GET_CATE_LIST_SUCCESS': {
            return Object.assign({}, state, {
                cateList: action.data,
                operation: {
                    type: 'get',
                    name: '获取数据',
                    res: true,
                    msg: ''
                }
            });
        }
        case 'GET_CATE_LIST_ERROR':
            return Object.assign({}, state, {
                operation: {
                    type: 'get',
                    name: '获取数据',
                    res: false,
                    msg: action.error
                }
            });

        case 'GET_CODE_LIST_SUCCESS': {
            return Object.assign({}, state, {
                codeList: action.data,
                operation: {
                    type: 'get',
                    name: '获取数据',
                    res: true,
                    msg: ''
                }
            });
        }
        case 'GET_CODE_LIST_ERROR':
            return Object.assign({}, state, {
                operation: {
                    type: 'get',
                    name: '获取展会编码列表',
                    res: false,
                    msg: action.error
                }
            });

        case 'GET_CMS_LIST_SUCCESS': {
            return Object.assign({}, state, {
                cmsList: action.data,
                operation: {
                    type: 'get',
                    name: '获取数据',
                    res: true,
                    msg: ''
                }
            });
        }

        case 'GET_CMS_LIST_ERROR':
            return Object.assign({}, state, {
                operation: {
                    type: 'get',
                    name: '获取展会列表',
                    res: false,
                    msg: action.error
                }
            });

        default:
            return Object.assign({}, state, {
                operation: {
                    type: '',
                    name: '',
                    res: true,
                    msg: ''
                }
            });
    }
}

export default publicReducer;