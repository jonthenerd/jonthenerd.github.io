export function safeStringify(obj) {
    const seen = new WeakSet();

    return JSON.stringify(
        obj,
        function (key, value) {
            // Skip the root object
            if (key === "collections") {
                return "<collections>";
            }
            try {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return "circular";
                    }
                    seen.add(value);
                }
            } catch {
                return "not avabilable";
            }
            return value;
        },
        4,
    );
}
