import React, { useCallback, useState } from "react"
import ReactDOM from "react-dom"

import type { EditorState } from "@codemirror/state"
import type { TreeCursor } from "@lezer/common"
import { syntaxTree } from "@codemirror/language"

import { Editor } from "./editor.js"
import { initialValue } from "./initialValue.js"

function scan(cursor: TreeCursor, lines: string[], depth = 0) {
	lines.push(`${"  ".repeat(depth)}- ${cursor.name}`)
	if (cursor.firstChild()) {
		do {
			scan(cursor, lines, depth + 1)
		} while (cursor.nextSibling())
		cursor.parent()
	}
}

function Index({}) {
	const [ast, setAST] = useState("")
	const handleChange = useCallback((state: EditorState) => {
		const tree = syntaxTree(state)
		const cursor = tree.cursor()
		const lines: string[] = []
		scan(cursor, lines)
		setAST(lines.join("\n"))
	}, [])

	return (
		<>
			<Editor initialValue={initialValue} onChange={handleChange} />
			<pre className="ast">{ast}</pre>
		</>
	)
}

ReactDOM.render(<Index />, document.querySelector("main"))
