//这个文件就是用来管理请求各种接口地址的
import Network from './network'


export const getBanner = ()=> Network.get('banner?type=2')
