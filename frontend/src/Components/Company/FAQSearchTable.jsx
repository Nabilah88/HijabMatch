import { Box, DataTable, Text } from "grommet";
import { faqData } from "./faqData"; // your FAQ items

export default function FAQSearchTable({ searchValue = "" }) {
  const filteredResults = faqData.filter(item =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (!searchValue) return null; // hide table when search is empty

  return (
    <Box margin={{ top: "medium" }}>
      {filteredResults.length > 0 ? (
        <DataTable
          data={filteredResults}
          columns={[
            { property: "title", header: <Text>Question</Text> },
            { property: "category", header: <Text>Category</Text> },
          ]}
        />
      ) : (
        <Text>No matching FAQ results.</Text>
      )}
    </Box>
  );
}
