package main

import (
	tea "github.com/charmbracelet/bubbletea"
	"go_tui/utils"
	"log"
)

func main() {
	model := utils.NewModel()
	program := tea.NewProgram(model, tea.WithAltScreen())
	_, err := program.Run()
	if err != nil {
		log.Fatalln(err)
	}
}
