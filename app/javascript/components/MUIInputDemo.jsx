import React from "react"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

export default function MUIInputDemo() {
  return (
    <Stack spacing={2} sx={{ width: 320 }}>
      <TextField label="Email" defaultValue="name@example.com" size="small" variant="outlined" />
      <TextField label="Username" defaultValue="peduarte" size="small" variant="outlined" />
      <TextField label="Disabled" defaultValue="Unavailable" size="small" variant="outlined" disabled />
      <TextField
        label="Error"
        defaultValue="invalid-address"
        size="small"
        variant="outlined"
        error
        helperText="Please enter a valid email address"
      />
    </Stack>
  )
}
