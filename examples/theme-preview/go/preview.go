// Package main demonstrates declarations, built-ins, and call sites.
package main

import (
	"context"
	"fmt"
	"time"
)

type Status uint8

const (
	Closed Status = iota
	Open
)

type Berth struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Depth float64 `json:"depth,omitempty"`
}

type Describer interface {
	Describe() string
}

func (b *Berth) Describe() string {
	return fmt.Sprintf("%s: %.1fm", b.Name, b.Depth)
}

func First[T any](values []T) (value T, ok bool) {
	if len(values) == 0 {
		return value, false
	}
	return values[0], true
}

func receive(ctx context.Context, arrivals <-chan *Berth) error {
	select {
	case berth := <-arrivals:
		var named Describer = berth
		fmt.Println(named.Describe())
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	berths := []Berth{{ID: 0x2a, Name: "North", Depth: 3.5}}
	lookup := map[string]Status{"North": Open}
	arrivals := make(chan *Berth, 1)
	go func() { arrivals <- &berths[0] }()
	if err := receive(ctx, arrivals); err != nil {
		fmt.Println("arrival error:", err)
	}
	for name, status := range lookup {
		fmt.Println(name, status, `raw\nstring`)
	}
	_, _ = First(berths)
}
