var hx = require("hbuilderx");
const converter = require("./dist/converter.js")
// const converter = require("./src/converter.js")

//该方法将在插件激活的时候调用
function activate(context) {
	[
		"markdownToPdf",
		"markdownToWord",
		"markdownToHtml",
	].forEach(id => {
		context.subscriptions.push(hx.commands.registerCommand(`extension.${id}`, (context) => {
			hx.window.showInformationMessage(`转换${id}`);	
			converter(context, id).convert()
		}))
	})
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
