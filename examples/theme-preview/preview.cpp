// Preprocessor directives, templates, references, and raw strings.
#include <iostream>
#include <optional>
#include <string>
#include <vector>

#define HARBOR_NAME "Bronze"

namespace harbor {
constexpr unsigned LIMIT = 0x2Au;
enum class Status { closed, open };

struct Berth {
    std::string name;
    double depth = 3.5;
    Status status = Status::open;

    [[nodiscard]] std::string describe() const {
        return name + ": " + std::to_string(depth);
    }
};

template <typename T>
std::optional<T> first(const std::vector<T>& values) {
    if (values.empty()) return std::nullopt;
    return values.front();
}
} // namespace harbor

int main() {
    using harbor::Berth;
    const std::vector<Berth> berths{{"North", 4.5}, {"South", 2.0}};
    auto label = [](const Berth& berth) { return berth.describe(); };
    const auto raw = R"json({"name": "Bronze", "open": true})json";
    const Berth* pointer = &berths.front();
    for (const auto& berth : berths) {
        std::cout << label(berth) << '\n';
    }
    if (auto found = harbor::first(berths); found.has_value()) {
        std::cout << HARBOR_NAME << raw << pointer->name << harbor::LIMIT;
    }
    return 0;
}
