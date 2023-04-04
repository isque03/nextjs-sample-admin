import { Box, useTheme, Typography } from "@mui/material";
import type { RuleGroupType } from 'react-querybuilder';
import { useState } from "react";
import { QueryBuilder } from 'react-querybuilder';
import { QueryBuilderMaterial } from "@react-querybuilder/material";

const Builder = ({ fields, components }) => {

  const initialQuery: RuleGroupType = { combinator: 'and', rules: [] };

  const [query, setQuery] = useState(initialQuery);
  const theme = useTheme();
  return (<Box>
    <Typography variant="h5">Query Builder</Typography>

    <QueryBuilderMaterial>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={(q) => {
          console.log(q);
          setQuery(q);
        }}
        showCloneButtons
        showCombinatorsBetweenRules
        showNotToggle
        controlClassnames={{ queryBuilder: 'queryBuilder-branches' }} />
    </QueryBuilderMaterial>

  </Box>
  );
};
