"""Inspect function names separately from arguments and punctuation."""

from dataclasses import dataclass
from typing import Generic, TypeVar
import re

T = TypeVar("T")
LIMIT: int = 1_000
PATTERN = re.compile(r"(?P<name>[A-Z][a-z]+)\s+\d{2,4}$")


@dataclass(frozen=True)
class Berth:
    name: str
    depth: float = 3.5

    @property
    def label(self) -> str:
        return f"{self.name!r}: {self.depth:.1f}m"


class Registry(Generic[T]):
    def __init__(self, values: list[T]) -> None:
        self.values = values

    def first(self) -> T | None:
        return self.values[0] if self.values else None


def describe(value: int, name: str = "North", *, active: bool = True) -> str:
    """The declaration is bold; the call name below should not be."""
    return f"{name}: {value:#04x}" if active else "closed\n"


def arrivals():
    for index in range(3):
        yield Berth(f"Berth {index}", depth=2.0 + index)


options = Berth(name="Bronze")
value = 42
result = describe(value, options.name)
ports = [port.label for port in arrivals() if port.depth >= 3]
lookup = {port.name: port.depth for port in arrivals()}
transform = lambda depth: round(depth * 2, 1)

try:
    registry = Registry(list(arrivals()))
    assert registry.first() is not None
    print(result, ports, lookup, transform(3.5), PATTERN.pattern)
except (ValueError, AssertionError) as error:
    raise RuntimeError("preview failed") from error
finally:
    preview_complete = True
