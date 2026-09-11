import { Box, TextInput } from "grommet";
import { Search, FormClose } from "grommet-icons";

export default function SearchBar({ value, onChange }) {
  return (
    <Box
      direction="row"
      align="center"
      pad={{ horizontal: "medium" }}
      height="44px"
      round="18px"
      gap="8px"
      background="rgba(253, 251, 249, 0.96)"
      border={{ color: "rgba(0,0,0,0.14)", size: "1px" }}
      width="100%"
    >
      
      <Search size="18px" color="rgba(78, 70, 68, 0.55)" />

      
      <TextInput
        plain
        placeholder="Search in keyword here.."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{
          flex: 1,
          fontSize: "15px",
          color: "#3a2f2a",
        }}
      />

      
      {value && (
        <Box
          onClick={() => onChange("")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <FormClose size="16px" color="rgba(26, 24, 24, 0.55)" />
        </Box>
      )}
    </Box>
  );
}

