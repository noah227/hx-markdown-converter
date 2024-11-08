const mdpdf = require("mdpdf")

const convertToPdfSingle = async (input, dest) => {
	await mdpdf.convert({
		source: input,
		destination: dest,
		pdf: {
			format: "A4",
			orientation: "portrait"
		}
	})
}

const convertToWordSingle = () => {

}

const convertToHtmlSingle = () => {

}

const path = require("path")

const extensionMap = {
	markdownToPdf: "pdf",
	markdownToWord: "docx",
	markdownToHtml: "html"
}
/**
 * 获取保存的位置
 * @param {string} fsPath
 * @param {TConvertType} id
 */
const makeSaveDest = (fsPath, id) => {
	return path.join(path.dirname(fsPath), `${path.basename(fsPath)}.${extensionMap[id]}`)
}

/**
 * @typedef {"markdownToPdf" | "markdownToWord" | "markdownToHtml"} TConvertType
 * @param id {TConvertType}
 */
module.exports = (context, id) => {
	let fn
	const convertMultiple = context instanceof Array
	switch (id) {
		case "markdownToPdf":
			fn = convertToPdfSingle
			break;
		case "markdownToWord":
			fn = convertToWordSingle
			break
		case "markdownToHtml":
			fn = convertToHtmlSingle
			break
		default:
			// throw new Error("Invalid!")
			break;
	}
	return {
		convert() {
			const inputList = convertMultiple ? context.map(item => item.fsPath) : [context.fsPath]
			inputList.forEach(async input => {
				// todo 这里根据操作错误时的选择，还可以做同步/异步的优化
				await fn(input, makeSaveDest(input, id))
			})
		}
	}
}