import Select from "react-select";

export type AlgorithmDropdownValue = (typeof GraphAlgorithms)[number]["value"] | null;

export type AlgorithmDropdownProp = Readonly<{
  onChange: (algorithm: AlgorithmDropdownValue) => void;
}>;

export const GraphAlgorithms = [
  { value: "None", label: "Select An Algorithm" },
  { value: "dijkstra-shortest-path", label: "Dijkstra Algorithm" },
  { value: "breath-first-traversal", label: "Exhaustive Minimum Node Coloring" },
  { value: "brute-force-minimum-node-coloring", label: "Breath First Traversal" },
  { value: "node-excentricity", label: "Find Vertex Excentricity" },
  { value: "maximum-independent-set", label: "Find Maximum Independent Set" },
] as const;

export function AlgorithmDropdown({ onChange }: AlgorithmDropdownProp) {
  return (
    <Select
      className="w-full"
      placeholder="Select An Algorithm"
      styles={{
        control: (provided) => ({
          ...provided,
          height: "100%",
          minHeight: "100%",
          border: "none",
          boxShadow: "none",
          padding: "0px 3px ",
          backgroundColor: "rgb(248 250 252)",
        }),

        valueContainer: (provided) => ({
          ...provided,
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          padding: "0 6px",
          backgroundColor: "rgb(248 250 252)",
        }),

        input: (provided, state) => ({
          ...provided,
          margin: "0px",
        }),

        indicatorSeparator: (state) => ({
          display: "none",
        }),

        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: "100%",
        }),
      }}
      onChange={(algorithm) => {
        onChange(algorithm?.value ?? null);
      }}
      options={GraphAlgorithms}
    />
  );
}
