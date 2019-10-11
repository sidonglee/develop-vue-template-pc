/**
 * 自动聚焦input控件
 * 例子：<input v-focus/>
 */
const Directive = {
	inserted(el) {
		Array.from(el.childNodes).find(child => !!child.tagName && (child.tagName).toLowerCase() === 'input').focus()
	}
}
export default Directive