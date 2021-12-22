import { HighlightStyle, tags } from "@codemirror/highlight"

export const highlightStyle = HighlightStyle.define([
	{ tag: tags.keyword, color: "#708" },
	{ tag: tags.literal, color: "#164" },
	{ tag: tags.string, color: "#a11" },
	{ tag: tags.function(tags.variableName), color: "#00f" },
	{ tag: [tags.special(tags.variableName), tags.macroName], color: "#256" },
	{ tag: tags.definition(tags.propertyName), color: "#00c" },
	{ tag: tags.comment, color: "#940" },
])
