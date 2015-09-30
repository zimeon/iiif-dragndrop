all:
	pandoc -o /tmp/index.html -f markdown-implicit_figures README.md
	cat css/head.html /tmp/index.html css/tail.html > index.html
