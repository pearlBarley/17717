import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const sto = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,   
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync: require('你可以另外写一个文件专门处理sync') 	
})  
export default sto
//在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
// global.storage = storage;


function save(key, data, expires = undefined) {
  // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
  // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
  storage.save({
    key: key,  // 注意:请不要在key中使用_下划线符号!
    data: data,
    // 如果不指定过期时间，则会使用defaultExpires参数
    // 如果设为null，则永不过期
    expires: expires
  });
}

function load(key, handleFun=new function(){}, notfoundFun=new function(){}, expireFun=new function(){}) {
    
  // 读取
  storage.load({
    key: key,
    // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
    autoSync: true,
    // syncInBackground(默认为true)意味着如果数据过期，
    // 在调用sync方法的同时先返回已经过期的数据。
    // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
    syncInBackground: true,
    
    // 你还可以给sync方法传递额外的参数
    syncParams: {
	extraFetchOptions: {
	// 各种参数
	},
	someFlag: true,
    },
  }).then(ret => {
    handleFun(ret)
  }).catch(err => {
	console.warn(err.message);
	switch (err.name) {
	    case 'NotFoundError':
	        notfoundFun();
	        break;
        case 'ExpiredError':
            expireFun();
            break;
	}
  })
}

export let MyStorage = { save, load }