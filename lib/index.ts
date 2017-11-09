import * as pug from 'pug'
import * as jdistsUtil from 'jdists-util'
import * as jsyaml from 'js-yaml'
interface IPugAttrs extends jdistsUtil.IAttrs {
  /**
   * 数据来源
   */
  data?: string
}
/**
 * pug 模板渲染
 *
 * @param content 文本内容
 * @param attrs 属性
 * @param attrs.data 数据项，支持 JSON 和 YAML
 * @param attrs.rework 是否重新编译
 * @param scope 作用域
 * @param scope.execImport 导入数据
 * @return 返回渲染后的结果
 * @example processor():base
  ```js
  let attrs = {
    data: '#name',
  }
  let scope = {
    execImport: function (importion) {
      return `
        name: tom
        age: 13
      `
    },
  }
  console.log(JSON.stringify(processor(`
    b #{name} - #{age}
  `, attrs, scope)))
  // > "    <b>tom - 13</b>"
  console.log(JSON.stringify(processor(`b #{name} - #{age}`, attrs, scope)))
  // > "<b>tom - 13</b>"
  ```
 * @example processor():execImport is object
  ```js
  let attrs = {
    data: '#name',
  }
  let scope = {
    execImport: function (importion) {
      return {
        name: 'tom',
        age: 13,
      }
    },
  }
  console.log(JSON.stringify(processor(`
    b #{name} - #{age}
  `, attrs, scope)))
  // > "    <b>tom - 13</b>"
  ```
 * @example processor():data is undefined
  ```js
  let attrs = {
  }
  let scope = {
    execImport: function (importion) {
      return importion
    },
  }
  console.log(JSON.stringify(processor(`
    b #{1 + 2}
  `, attrs, scope)))
  // > "    <b>3</b>"
  ```
 * @example processor():content is null
  ```js
  let attrs = {
  }
  let scope = {
  }
  console.log(processor(null, attrs, scope))
  // > null
  ```
 */
export = (function (content: string, attrs: IPugAttrs, scope: jdistsUtil.IScope): string {
  if (!content) {
    return content
  }
  let match = content.match(/^[^\n\S]+/m)
  let space
  if (match) {
    space = match[0]
    let regex = new RegExp(`^[^\\n\\S]{${space.length}}`, 'gm')
    content = content.replace(regex, '')
  }
  let render = pug.compile(content, {})
  let data = null
  if (attrs.data) {
    data = scope.execImport(attrs.data)
    if (typeof data === 'string') {
      data = jsyaml.safeLoad(data)
    }
  }
  content = render(data)
  if (space) { // 需要补空白
    content = content.replace(/^/gm, space);
  }
  return content
}) as jdistsUtil.IProcessor