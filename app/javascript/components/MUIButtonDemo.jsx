import React from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

export default function MUIButtonDemo() {
  return (
    <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
      <Button variant="contained" disableRipple>
        Contained
      </Button>
      <Button variant="outlined" disableRipple>
        Outlined
      </Button>
      <Button variant="text" disableRipple>
        Text
      </Button>
      <Button variant="contained" size="small" disableRipple>
        Contained / Small
      </Button>
      <Button variant="contained" size="large" disableRipple>
        Contained / Large
      </Button>
      <Button variant="outlined" size="small" disableRipple>
        Outlined / Small
      </Button>
      <Button variant="contained" color="error" size="small" disableRipple>
        Error / Small
      </Button>
    </Stack>
  )
}
