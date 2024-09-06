package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
	"net/http"
	"net/url"
	"time"
)

type Model struct {
	Title     string
	TextInput textinput.Model
	Terms     Terms
	Err       error
}

func NewModel() Model {
	input := textinput.New()
	input.Placeholder = "Enter search here."
	input.Focus()
	return Model{
		Title:     "hello world",
		TextInput: input,
	}
}

func (m Model) Init() tea.Cmd {
	return textinput.Blink
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmd tea.Cmd

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.Type {
		case tea.KeyEnter:
			value := m.TextInput.Value()
			return m, handleQuerySearch(value)

		case tea.KeyCtrlQ:
			return m, tea.Quit
		case tea.KeyCtrlC:
			return m, tea.Quit
		}

	case TermsResponseMessage:
		if msg.Err != nil {
			m.Err = msg.Err
		}
		m.Terms = msg.Terms
		return m, nil
	}

	m.TextInput, cmd = m.TextInput.Update(msg)
	return m, cmd
}

func (m Model) View() string {
	s := m.TextInput.View() + "\n\n"
	if len(m.Terms.List) > 0 {
		s += m.Terms.List[0].Definition + "\n\n"
		s += m.Terms.List[0].Example + "\n\n"
		s += fmt.Sprintf("upvotes: %d\ndownvotes:%d\n\n", m.Terms.List[0].ThumbsUp, m.Terms.List[0].ThumbsDown)
	}
	return s
}

func handleQuerySearch(q string) tea.Cmd {
	return func() tea.Msg {
		newUrl := fmt.Sprintf("https://api.urbandictionary.com/v0/define?term=%s", url.QueryEscape(q))
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		req, err := http.NewRequestWithContext(ctx, "GET", newUrl, nil)
		if err != nil {
			return ErrorMessage(fmt.Errorf("error creating request: %w", err))
		}

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			return ErrorMessage(fmt.Errorf("error executing request: %w", err))
		}

		defer resp.Body.Close()

		var terms Terms
		err = json.NewDecoder(resp.Body).Decode(&terms)
		if err != nil {
			return TermsResponseMessage{
				Err: err,
			}
		}

		return TermsResponseMessage{
			Terms: terms,
		}
	}
}
