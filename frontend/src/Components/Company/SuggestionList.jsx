import { Box, Text, Anchor } from "grommet";
import styled from "styled-components";
import { searchData } from "./SearchData";

const SuggestionRow = styled(Box)`
  padding: 3px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;

  transition: background 120ms linear;

  &:hover {
    background: rgba(253, 251, 249, 0.6);
  }
`;

export default function SuggestionList({ searchValue = "" }) {
  const visible = searchValue.length > 0;

  const filtered = searchData.filter(item =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.info.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Box
      margin={{ top: "medium" }}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 180ms linear, transform 180ms linear",
      }}
    >
      {visible && filtered.map(item => (
        <SuggestionRow key={item.id}>
          <Anchor href={item.link} color="#C08A95" weight="bold">
            {item.title}
          </Anchor>

          <Text size="14px" color="rgba(80,65,60,0.75)">
            {item.info}
          </Text>
        </SuggestionRow>
      ))}

      {visible && filtered.length === 0 && (
        <Text color="rgba(80,65,60,0.6)" margin={{ top: "small" }}>
          No matching results found.
        </Text>
      )}
    </Box>
  );
}
