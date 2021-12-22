import React, { useEffect } from "react"

import type { EditorState } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import { basicSetup } from "@codemirror/basic-setup"
import { indentUnit } from "@codemirror/language"

import { circomLanguage } from "codemirror-lang-circom"
import { highlightStyle } from "./highlightStyle.js"
import { useCodeMirror } from "./codemirror.js"

const extensions = [
	indentUnit.of("    "),
	basicSetup,
	highlightStyle,
	circomLanguage,
	keymap.of(defaultKeymap),
]

;(window as any).circomLanguage = circomLanguage

interface EditorProps {
	initialValue: string
	onChange?: (state: EditorState) => void
}

export function Editor({ initialValue, onChange }: EditorProps) {
	const [state, transaction, _, element] = useCodeMirror<HTMLDivElement>({
		doc: initialValue,
		extensions,
	})

	useEffect(() => {
		if (onChange !== undefined && state !== null) {
			if (transaction === null || transaction.docChanged) {
				onChange(state)
			}
		}
	}, [state, transaction])

	return <div className="editor" ref={element}></div>
}
