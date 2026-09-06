//! Lifetimes, macros, traits, attributes, and pattern matching.
use std::collections::HashMap;

const LIMIT: usize = 0x2a;

#[derive(Debug, Clone, Copy)]
enum Status {
    Closed,
    Open { depth: f64 },
}

#[derive(Debug)]
struct Berth<'a> {
    name: &'a str,
    status: Status,
}

trait Describe {
    fn describe(&self) -> String;
}

impl<'a> Describe for Berth<'a> {
    fn describe(&self) -> String {
        match self.status {
            Status::Open { depth } if depth > 2.0 => format!("{}: {depth:.1}m", self.name),
            Status::Open { .. } => "shallow".into(),
            Status::Closed => String::from("closed"),
        }
    }
}

fn first<T>(values: &[T]) -> Option<&T> {
    values.first()
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let raw = r#"{"name": "Bronze"}"#;
    let marker: char = '\u{2693}';
    let berths = [
        Berth { name: "North", status: Status::Open { depth: 3.5 } },
        Berth { name: "South", status: Status::Closed },
    ];
    let mut lookup = HashMap::new();
    for berth in &berths {
        lookup.insert(berth.name, berth.describe());
    }
    if let Some(berth) = first(&berths) {
        println!("{marker} {} {raw} {LIMIT}", berth.describe());
    }
    Ok(())
}
