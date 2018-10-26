/**   
 * api接口统一管理
 * by fengyang
 */
import Vue from 'vue'
import { get, post } from './http'
//config.js配置多个接口

/*------图片本地接口------*/
export const apiGetImage = () => get('getImg/image.json');
